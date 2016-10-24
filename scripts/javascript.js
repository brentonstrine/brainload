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
    var componentPrototype = (function(){
        var score = 0;
        this.updateScore= function(amount){
            score += amount;
        };
        this.getScore = function(){
            return score;
        };
        this.getComponent = function(type){
            return "No component specified.";
        }
        return {getComponent, updateScore, getScore};
    }());

    var components = (function() {
        this.test = Object.create(componentPrototype, {
            getComponent: {value: function(type){
                var fragment;
                if(type==true){
                    fragment = "test";
                } else {
                    fragment = pickFromArr(["vest", "chest", "breast", "nest"]);
                }
                fragment += "<span class='js-syntax-explanation js-syntax-explanation-meta'>test</span>";
                return fragment;
            }}
        });

        this.variable = Object.create(componentPrototype, {
            getComponent: {value: function(type){
                var fragment;
                if(type==true){
                    fragment = "var";
                } else {
                    fragment = pickFromArr(["VAR", "Variable", "Var", "vaR", "variable", "x", pickFrom(0,999), "myVar"]);
                }
                fragment += "<span class='js-syntax-explanation js-syntax-explanation-meta'>variable declaration</span>";
                return fragment;
            }}
        });
        this.space = Object.create(componentPrototype, {
            getComponent: {value: function(type){
                var fragment;
                if(type==true){
                    fragment = "&nbsp;";
                } else {
                    fragment = pickFromArr(["<span> </span>", pickFromArr(["-", "*", "$", "'", "=", "."])]);
                }
                fragment += "<span class='js-syntax-explanation'>space</span>";
                return fragment;
            }}
        });
        this.identifier = Object.create(componentPrototype, {
            getComponent: {value: function(type){
                var fragment;

                if(type==true){
                    fragment = pickFromArr(["x", "y", "z", "myVarName", "monkey", "A", "B", "C"]);
                } else {
                    fragment = pickFromArr(["<span> </span>" + pickFrom(0,999), "<span> </span>x", "<span> _ </span>", ";", "=", "-", pickFrom(0,999), "<br>x"]);
                }
                fragment += "<span class='js-syntax-explanation'>identifier</span>";
                return fragment;
            }}
        });
        this.assignment  = Object.create(componentPrototype, {
            getComponent: {value: function(type){
                var fragment;
                if(type==true){
                    fragment = "=";
                } else {
                    fragment = pickFromArr("==", "===", "<span> _ </span>", "pickFrom(0,999)", "-", "!");
                }
                fragment += "<span class='js-syntax-explanation'>assignment</span>";
                return fragment;
            }}
        });
        this.object  = Object.create(componentPrototype, {
            getComponent: {value: function(type){
                var fragment;
                if(type==true){
                    fragment = "{}";
                } else {
                    fragment = pickFromArr("{", "}", "}{", "<span> _ </span>", "{]", "[}", "<>");
                }
                fragment += "<span class='js-syntax-explanation'>object</span>";
                return fragment;
            }}
        });
        this.number  = Object.create(componentPrototype, {
            getComponent: {value: function(type){
                var fragment;
                if(type==true){
                    fragment = pickFrom(0,999);
                } else {
                    fragment = pickFromArr(["<span> _ </span>", "=", "&", "+", ", ", "; ", "var"]);
                }
                fragment += "<span class='js-syntax-explanation'>number</span>";
                return fragment;
            }}
        });
        this.semicolon  = Object.create(componentPrototype, {
            getComponent: {value: function(type){
                var fragment;
                if(type==true){
                    fragment = ";<br>";
                } else {
                    fragment = pickFromArr(["<span>_</span>", ": ", ". ", ", ", "<span>_</span>"]);
                }
                fragment += "<span class='js-syntax-explanation'>semicolon</span>";
                return fragment;
            }}
        });
        return {
            variable,
            identifier,
            assignment,
            number,
            semicolon,
            space,
            test,
        }
    }());
    var expressionPrototype = (function(){
        var score = 0;
        this.updateScore= function(amount){
            score += amount;
        };
        this.getScore = function(){
            return score;
        };
        this.getExpression = function(type){
            return "No component specified.";
        }
        return {getExpression, updateScore, getScore};
    }());
    // Expressions and operators.
    var expressions = (function(){
        this.test = Object.create(componentPrototype, {
            getExpression: {value: function(type){
                var fragment;
                fragment = components.test.getComponent(true)
                fragment = components.test.getComponent()
                fragment = components.test.getComponent()
                fragment = components.test.getComponent()
                return fragment;
            }}
        });
        return {test};
    }());
debugger;
var patterns = [
    {
        prototypeString: "var x;",
        components: [
            {
                name: "test",
                component: components.test,
                history: [{valid: true,time: 4000},],
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
    },
    {
        prototypeString: "var x;<br>x = 1;",
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
            },{
                name: "space",
                component: components.space,
                history: [
                    {
                        valid: true,
                        time: 4000 //ms
                    },
                ],
                score: null,
                level: 0,
            },{
                name: "identifier",
                component: components.identifier,
                history: [
                    {
                        valid: true,
                        time: 4000 //ms
                    },
                ],
                score: null,
                level: 1,
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
                level: 50,
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
                level: 1,
            },
            {
                name: "space",
                component: components.space,
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
                level: 50,
            },
            {
                name: "space",
                component: components.space,
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
                level: 50,
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
                level: 50,
            },
        ],
        history: [],
        level: 0
    },
    {
        prototypeString: "var x = {};",
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
                name: "object",
                component: components.object,
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
    $(".window").removeClass("js-showAnswer");
    setTimeout(function() {
        $(".background").removeClass("js-correct");
        $(".background").removeClass("js-incorrect");

    }, 500);

    console.group("Question ", ++runCount);
    var patternNum = pickFrom(0, level);
    console.log("level     : ", level);
    console.log("patternNum: ", patternNum);
    var pattern = patterns[patternNum];
    var patternLevel = pattern.level;
    var test = "";
    var answer;
    var currentlyTesting;
    var wrongComponent = -1;
    var currentComponents = pattern.components;

    if( (pattern.history.length <= 1 || Math.round(Math.random())) ) {
    // if this is the first time we assessed,
    // or this or the previous answer was wrong,
    // or a coin flip is heads,
    //                         give a true this time

        //console.log("First time? ", patternLevel < 1);
        console.log("No history? ", pattern.history.length <= 1, pattern.history.length);
        console.log("Coin flip ? ", (patternLevel < 1 || pattern.history.length <= 1)?false:true);
        answer = true;
        console.log("TRUE");
        currentlyTesting = pattern;//when answer is true, we're testing the pattern not the component
    } else {
        console.log("pattern.history.length: ", pattern.history.length);
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
            test += "<span class='js-syntax-err'>";
        } else {

            test += "<span class='js-syntax-ok'>";
        }
        currentComponents[i];
        test += currentComponents[i].component.getComponent(type) + "</span>";
        console.log(test);
    }

    if(!currentlyTesting) {
        debugger;
    }
    evaluateLevels();
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
    var delay = 200;
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
        $(".background").addClass("js-correct");
    } else {
        currentQuestion.pattern.level--;
        currentQuestion.currentlyTesting.level--;
         result = false;
        console.log("Wrong!!! Answer was ", currentQuestion.answer,
            "Level down to ", currentQuestion.pattern.level,
            "!\nTest was: \n", currentQuestion.test,
            "!\nComponent ID was: \n", currentQuestion.wrongComponent,
            "!\nComponent was: \n", currentQuestion.currentComponents ? currentQuestion.currentComponents[0].component.getComponent(false) : ""

        );
        $(".background").addClass("js-incorrect");
        $(".window").addClass("js-showAnswer");
        delay = 1000;
    }

    // log their answer
    currentQuestion.currentlyTesting.history.push({
        valid: result,
        time: 4000
    });

    currentQuestion = {exists:false}
    setTimeout(function() {
     runTest();
    }, delay);
};

var evaluateLevels = function(){
    console.group("Check Levels");
    console.log(patterns[level].level,"/", level);
    if(patterns[level].level > 5) {
        level++;
        console.log("level++: ", level);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    } else {
        console.log(patterns[level].level, " is less than 6.");
    }

    console.groupEnd();
};





// last thing in program!!

});



//todo :
/*
Normalize probability
award points for true tests.
move to next level based on score.


*/
