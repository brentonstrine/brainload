define(
["utils", "testCode", "components", "expressions", "patterns",
"tests", "codeUtils"],
function(utils, testCode, components, expressions, patterns,
tests, codeUtils) {

    var currentQuestion = {exists:false};
    var level = 0;
    var runCount = 0;
    var testList = [tests[0]];
    var parent = this;


    var levelUp = function(){
        level++;
        testList.push(tests[level]);
    };

    var getQuestion = function(){
        return currentQuestion;
    };
    var setQuestion = function(q){
        currentQuestion = q;
    };

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


    var runTest2 = function(){
        setTimeout(function() {
            $(".window").removeClass("js-showAnswer");
            $(".background").removeClass("js-correct");
            $(".background").removeClass("js-incorrect");
        }, 500);

        //decide if test will be true or false
        var testType = Math.round(Math.random());

        //pick which code we're going to test
        var testId = codeUtils.chooseCode(testList);
        var q = testList[testId].get(testType);
        setQuestion(q);

        //get test string
        var testMarkup;
        for(i=0;i<q.lines.length;i++){
            testMarkup += '<span class="line' + i + '">';
            testMarkup += q.lines[i].string;
            testMarkup += '</span>';
        }

        // insert test code into window
        $(".window .code").html(testMarkup);

        console.log("waiting on your answer");
        console.groupEnd();

    };

    var checkResult = function(result) {
        var delay = 200;
        var score;
        var question = getQuestion();
        if(result == question.answer){
        // Correct
            score = 1;

        //     result = true;
        //     console.log("Correct! level up to ", currentQuestion.pattern.level, "!");
            $(".background").addClass("js-correct");
        } else {
        // Incorrect
            score = -1;

        //     currentQuestion.pattern.level--;
        //     currentQuestion.currentlyTesting.level--;
        //      result = false;
        //     console.log("Wrong!!! Answer was ", currentQuestion.answer,
        //         "Level down to ", currentQuestion.pattern.level,
        //         "!\nTest was: \n", currentQuestion.test,
        //         "!\nComponent ID was: \n", currentQuestion.wrongComponent,
        //         "!\nComponent was: \n", currentQuestion.currentComponents ? currentQuestion.currentComponents[0].component.get(false) : ""
        //
        //     );
            $(".background").addClass("js-incorrect");
            $(".window").addClass("js-showAnswer");
            delay = 1000;
        }


        // parse through the current question
        for(i=0;i<question.lines.length;i++){

            // level up everything that contributed!
            for(j=0;j<question.lines[i].components.length;j++){
                question.lines[i].components[j].updateScore(score);
                question.lines[i].components[j].addToHistory(score);
            }
        }


        // log their answer
        // currentQuestion.currentlyTesting.history.push({
        //     valid: result,
        //     time: 4000
        // });

        question = null;
        runTest2();
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
        levelUp,
        getQuestion,
        setQuestion,
        runTest2,
        checkResult,
        evaluateLevels
    }

});