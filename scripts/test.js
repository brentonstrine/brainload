define(
["utils", "testCode", "components", "expressions", "patterns"],
function(utils, testCode, components, expressions, patterns) {

    var currentQuestion = {exists:false};
    var level = 0;
    var runCount = 0;

    var runTest = function(){

        $(".window").removeClass("js-showAnswer");

        setTimeout(function() {
            $(".background").removeClass("js-correct");
            $(".background").removeClass("js-incorrect");

        }, 500);

        console.group("Question ", ++runCount);
        var patternNum = utils.pickFrom(0, level);
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
            wrongComponent = lowestComponents[utils.pickFrom(0, lowestComponents.length-1)];
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
            test += currentComponents[i].component.get(type) + "</span>";
            console.log(test);
        }

        // insert test code into window
        $(".window .code").html(test);

        if(!currentlyTesting) {
            debugger;
        }
        evaluateLevels();


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
                "!\nComponent was: \n", currentQuestion.currentComponents ? currentQuestion.currentComponents[0].component.get(false) : ""

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

    return {
        runTest,
        checkResult,
        evaluateLevels
    }

});