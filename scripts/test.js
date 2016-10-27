define(
["utils", "testCode", "components", "expressions", "patterns",
"tests", "codeUtils"],
function(utils, testCode, components, expressions, patterns,
tests, codeUtils) {

    var currentQuestion = true;
    var level = 0;
    var runCount = 0;
    var testList = [tests[0]];
    var parent = this;


    var levelUp = function(){
        level++;
        testList.push(tests[level]);
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
        console.log("++++++++++++++++++++++++++++++++++++++++++");
        console.log("+++++++++++++++++++++++++++++++++++++");
        console.log("++++++++++++++++++++++++++++++++");
        console.log("+++++++++++++++++++++++++++");
        console.log("++++++++++++++++++++++");
        console.log("++++++++++++++++++");
        console.log("+++++++++++++++++++++++");
        console.log("+++++++++++++++++++++++++++");
        console.log("++++++++++++++++++++++++++++++++");
        console.log("+++++++++++++++++++++++++++++++++++++");
        console.log("++++++++++++++++++++++++++++++++++++++++++");
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
        console.log("++++++++++++LEVEL UP +++++++++++++++++++++++++++++++");
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

    };
    var getQuestion = function(){
        return currentQuestion;
    };
    var setQuestion = function(q){
        currentQuestion = q;
    };

    var runTest2 = function(){
        console.group("runTest2");
        console.log("--- building new question (" +level+ ") ------------------------------------------");

        //decide if test will be true or false
        var testType = Math.round(Math.random());

        //pick which code we're going to test
        var testId = codeUtils.chooseCode(testList);
        var q = testList[testId].get(testType);
        setQuestion(q);

        // insert test code into window
        $(".window .code").html(q.string);

        console.log("--- waiting on your answer (" +level+ ") -------------------------------------");

        console.groupEnd();
    };

    var checkResult = function(result) {
        console.group("checkResult");
        console.log("result", result);
        var delay = 200;
        var question = getQuestion();
        var answer = question.answer;
        var score = (result == answer) ? true : false;
        var points;
        if(score){
        // Correct
            //award more points if the answer was false.
            points = (answer == true) ? 2 : 10;
            $(".background").addClass("js-correct");
        } else {
        // Incorrect
            //deduct more points if the answer was false.
            points = (answer == true) ? -5 : -20;

            console.log(question);
            console.log("Wrong!!! Answer was ", answer);

            $(".background").addClass("js-incorrect");
            $(".window").addClass("js-showAnswer");
            delay = 1900; // should match .js-incorrect animation-duration
        }

        var lowestScore = 9999;
        var scoreObj = [];
        // parse through each expression
        for(var i=0;i<question.resultList.length;i++){
            var thisExpression = question.resultList[i];
            var thisExpressionObject = question.components[i];

            //update expression score
            thisExpressionObject.updateScore(points);

            //get score of expression
            scoreObj[i] = {expression: thisExpressionObject.getScore()};
            scoreObj[i].components = [];

            console.log("expression" + i + ": " + thisExpressionObject.getScore())

            if(thisExpression.answer===false){// if the answer was false for this expression

                //only update score of trick part
                var errLoc = thisExpression.errLocation;
                thisExpression.components[errLoc].updateScore(points);
                thisExpression.components[errLoc].addToHistory(score);

                //get score of each component
                for(var j=0;j<thisExpression.components.length;j++){
                    var thisScore = thisExpression.components[j].getScore();
                    scoreObj[i].components[j] = thisScore;
                    console.log("expression" + i + ".component"+j+": " + thisExpressionObject.getScore())

                    if(thisScore < lowestScore){
                        lowestScore = thisScore;
                    }
                }
            } else {//if the answer was true, update score of all parts

                for(var j=0;j<thisExpression.components.length;j++){
                    //update all component scores
                    thisExpression.components[j].updateScore(points);
                    thisExpression.components[j].addToHistory(score);

                    //get score of components
                    var thisScore = thisExpression.components[j].getScore();
                    scoreObj[i].components[j] = thisScore;
                    console.log("expression" + i + ".component"+j+": " + thisExpressionObject.getScore())

                    if(thisScore < lowestScore){
                        lowestScore = thisScore;
                    }
                }
            }
        }

        console.log("Score: ", scoreObj);
        console.log("Lowest Score: ", lowestScore);


        if(level == 0 && lowestScore > 125) {
            levelUp();
        } else if (level == 1 && lowestScore > 135) {
            alert(lowestScore);
            levelUp();
        } else if (level == 2 && lowestScore > 145) {
            alert(lowestScore);
            levelUp();
        } else if (level == 3 && lowestScore > 155) {
            alert(lowestScore);
            levelUp();
        } else if (level == 4 && lowestScore > 165) {
            alert(lowestScore);
            levelUp();
        } else if (level == 5 && lowestScore > 175) {
            alert(lowestScore);
            levelUp();
        }

        //cleanup
        setQuestion(false);
        setTimeout(function() {
            //$(".window").removeClass("js-showAnswer");
            $(".background").removeClass("js-correct");
            $(".background").removeClass("js-incorrect");
            //runTest2();
        }, delay);
        console.groupEnd();
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