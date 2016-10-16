$(function(){

    var displayTest = function (test){
            $(".window .code").html(test);
    }

    $(document).on("keyup", function(e){
        console.log(e.which);
        switch(e.which) {
            //right arrow
            case 39:
                console.log("GUESS TRUE")
                checkResult(true);
            break;
            //left arrow
            case 37:
            console.log("GUESS FALSE")
                checkResult(false);
            break;

            default:

        }
    });




var currentQuestion = {exists:false};

var components = (function() {
    this.variable = function(type){
        var fragment;
        if(type==true){
            fragment = "var";
        } else {
            fragment = pickFromArr(["VAR", "Variable", "Var", "vaR", "variable", "x", pickFrom(0,999), "myVar"]);
        }
        return fragment;
    };
    this.identifier = function(type){
        var fragment;
        if(type==true){
            fragment = " x";
        } else {
            fragment = "8";
        }
        return fragment;
    };
    this.assignment = function(type){
        var fragment;
        if(type==true){
            fragment = " =";
        } else {
            fragment = "===";
        }
        return fragment;
    };
    this.number = function(type){
        var fragment;
        if(type==true){
            fragment = " " + pickFrom(0,999);
        } else {
            fragment = pickFromArr([" ", " =", " &", " +", ", ", "; ", " var"]);
        }
        return fragment;
    };
    this.semicolon = function(type){
        var fragment;
        if(type==true){
            fragment = "; ";
        } else {
            fragment = pickFromArr([" ", ": ", ". ", " ", ", ", " "]);
        }
        return fragment;
    };
    return {
        variable,
        identifier,
        assignment,
        number,
        semicolon,
    }
}());

var patterns = [
    {
        prototype: "var x = 1;",
        components: [
            {
                name: "variable",
                component: components.variable,
                history: [
                    {
                        valid: true,
                        time: 4000 //ms
                    },
                ],
                score: null,
                level: 0,
            },
            {
                name: "identifier",
                component: components.identifier,
                history: [
                    {
                        valid: true,
                        time: 4000 //ms
                    },
                ],
                score: null,
                level: 0,
            },
            {
                name: "assignment",
                component: components.assignment,
                history: [
                    {
                        valid: true,
                        time: 4000 //ms
                    },
                ],
                score: null,
                level: 0,
            },
            {
                name: "number",
                component: components.number,
                history: [
                    {
                        valid: true,
                        time: 4000 //ms
                    },
                ],
                score: null,
                level: 0,
            },
            {
                name: "semicolon",
                component: components.semicolon,
                history: [
                    {
                        valid: true,
                        time: 4000 //ms
                    },
                ],
                score: null,
                level: 0,
            },
        ],
        history: [],
        level: 0
    }
];
var level = 0;
var runCount = 0;

// test pattern 1
var runTest = function(){
    setTimeout(function() {
        $(".background").removeClass("correct");
        $(".background").removeClass("incorrect");
    }, 500);


    console.group("Question ", ++runCount);
    var patternNum = pickFrom(0, level);
    var pattern = patterns[patternNum];
    var patternLevel = pattern.level;
    var test = "";
    var answer;
    var currentlyTesting;
    var wrongComponent = -1;

    if(patternLevel < 1) {
        test = pattern.prototype;
        answer = true;
        currentlyTesting = pattern;
    } else {
        var currentComponents = pattern.components;


        // if this is the first time we assessed,
        // or this or the previous answer was wrong,
        // or a coin flip is heads,
        //                         give a true this time
        if(pattern.history.length <= 1 || Math.round(Math.random()) ) {
            answer = true;
            console.log("TRUE");
            currentlyTesting = pattern;//when answer is true, we're testing the pattern not the component
        } else {
            answer = false;
            console.log("FALSE");

            //get the lowest scoring components and pick randomly from them.
            var lowestLevel = 100;
            var lowestComponents = [];

            for(i=0;i<currentComponents.length;i++){
                var thisComponent = currentComponents[i];
                var thisLevel = thisComponent.level;

                console.log(i,thisComponent.name,":", thisComponent.level);

                // when we encounter a new low, reset lowest
                if(thisLevel<lowestLevel){
                    lowestLevel = thisLevel;
                    lowestComponents = [];
                }

                // if we're within three of lowest, reset
                if((thisLevel+5)<(lowestLevel)){
                    lowestComponents = [];
                }

                // add component id to array, if it is within 3 of lowest level
                if(thisLevel<=(lowestLevel+5)){
                    lowestComponents.push(i);
                }
            }
console.log(lowestComponents);
            wrongComponent = lowestComponents[pickFrom(0, lowestComponents.length-1)];
            if(!wrongComponent && wrongComponent!==0 ) {
                debugger;
            }

            currentlyTesting = currentComponents[wrongComponent];
        }

        //build component

        for(i=0; i<currentComponents.length; i++){
            var type = true;
            if(i==wrongComponent){
                type = false;
                console.log(wrongComponent);
            }
            test += currentComponents[i].component(type);
        }

    }
if(!currentlyTesting) {
    debugger;
}
    displayTest(test);


    currentQuestion.exists = true;
    currentQuestion.pattern = pattern;
    currentQuestion.currentlyTesting = currentlyTesting;
    currentQuestion.test = test;
    currentQuestion.wrongComponent = wrongComponent;
    currentQuestion.answer = answer;
    if(currentComponents){currentQuestion.currentComponents = currentComponents;}

    console.log("waiting on your answer");
    console.groupEnd();

};

var checkResult = function(result) {
    if(!currentQuestion.exists){
        console.log("no current answer.");
        debugger;
        return;
    }

    if(result == currentQuestion.answer){
        currentQuestion.pattern.level++;
        currentQuestion.currentlyTesting.level++;
        result = true;
        console.log("Correct! level up to ", currentQuestion.pattern.level, "!");
        $(".background").addClass("correct");
    } else {
        currentQuestion.pattern.level--;
        currentQuestion.currentlyTesting.level--;
         result = false;
        console.log("Wrong!!! Answer was ", currentQuestion.answer,
            "Level down to ", currentQuestion.pattern.level,
            "!\nTest was: \n", currentQuestion.test,
            "!\nComponent ID was: \n", currentQuestion.wrongComponent,
            "!\nComponent was: \n", currentQuestion.currentComponents ? currentQuestion.currentComponents[0].component(false) : ""

        );
        $(".background").addClass("incorrect");
    }
    currentQuestion.currentlyTesting.history.push({
        valid: result,
        time: 4000
    });

    currentQuestion = {exists:false}
    setTimeout(function() {
     runTest();
    }, 500);
};

var pickFrom = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var pickFromArr = function (arr) {
  var max = arr.length - 1;
  var min = 0;
  min = Math.ceil(min);
  max = Math.floor(max);
  return arr[Math.floor(Math.random() * (max - min + 1)) + min];
}
console.clear();
runTest();
});

