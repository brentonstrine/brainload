define(
["utils", "testCode", "components", "expressions",
"tests", "codeUtils"],
function(utils, testCode, components, expressions,
tests, codeUtils) {

    var currentQuestion = true;
    var level = 0;
    var runCount = 0;
    var testList = [tests[0]];
    var parent = this;
    var won = false;

    var levelUp = function(){
        if( (level + 1) == tests.length ){
            won = true;
        } else {
            level++;
            testList.push(tests[level]);
            ;console.log("++++++++++++ LEVEL UP +++++++++++++");
        }
    };

    var skipToLevel = function(level){
        level = parseInt(level);
        for(var i=0;i<level;i++){
            levelUp();
            //
        }
    };

    var getQuestion = function(){
        return currentQuestion;
    };
    var setQuestion = function(q){
        currentQuestion = q;
    };

    var buildTest = function(){
        ;console.group("buildTest()");
        ;console.log("--- building new question (" +level+ ") ------------------------------------------");

        //decide if test will be true or false
        var testType = Math.round(Math.random());

        //pick which code we're going to test
        var testId = codeUtils.chooseCode(testList);
        var qObject = testList[testId];
        var qResult = qObject.get(testType);
        setQuestion({object: qObject, guess: qResult});

        // insert test code into window
        $(".window .code").html(qResult.string);

        ;console.log("--- waiting on your answer (" +level+ ") -------------------------------------");
        ;console.groupEnd();
    };

    var checkGuess = function(guess) {
        ;console.group("checkGuess");
        ;console.log("guess", guess);
        var delay = 200;
        var currentQuestion = getQuestion();
        var questionObject = currentQuestion.object;
        var question = currentQuestion.guess;
        var answer = question.answer;
        var score = (guess == answer) ? true : false;
        var points;
        if(score){
        // Correct
            //award more points if the answer was false.
            points = (answer == true) ? 2 : 10;
            $(".background").addClass("js-correct");
            var emoji = "✅ ";// utils.pickFromArr(["👌","💯", "👍", "🙌", "🙆", "👏", "✅", "🤘", "🎉", "💃", "👯", "🎊", "😀", "😉", "😊", "😋", "😍", "😘", "🤗", "🤓", "😛", "😜", "😝"])
            $(".window .result").html(emoji);
            $(".background .history").append(emoji);
        } else {
        // Incorrect
            //deduct more points if the answer was false.
            points = (answer == true) ? -5 : -20;
            $(".window .result").html("❌ ");
            $(".background .history").append("❌ ");
            $(".background").addClass("js-incorrect");
            $(".window").addClass("js-showAnswer");
            delay = 1900; // should match .js-incorrect animation-duration
        }

        var lowestScore = 9999;
        var scoreObj = [];

        //update level score
        questionObject.updateScore(points);
        ;console.log("Test Score ---: " + questionObject.getScore())


        // parse through each expression
        for(var i=0;i<question.guessList.length;i++){
            var thisExpression = question.guessList[i];
            var thisExpressionObject = question.components[i];

            //update expression score
            thisExpressionObject.updateScore(points);

            //get score of expression
            scoreObj[i] = {expression: thisExpressionObject.getScore()};
            scoreObj[i].components = [];

            ;console.log("expression" + i + ": " + thisExpressionObject.getScore())

            if(thisExpression.answer===false){// if the answer was false for this expression

                //only update score of trick part
                var errLoc = thisExpression.errLocation;
                thisExpression.components[errLoc].updateScore(points);
                thisExpression.components[errLoc].addToHistory(score);

                //get score of each component
                for(var j=0;j<thisExpression.components.length;j++){

                    var thisScore = thisExpression.components[j].getScore();
                    scoreObj[i].components[j] = thisScore;
                    ;console.log("expression" + i + ".component"+j+": " + thisExpression.components[j].getScore())

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
                    ;console.log("expression" + i + ".component"+j+": " + thisExpression.components[j].getScore())

                    if(thisScore < lowestScore){
                        lowestScore = thisScore;
                    }
                }
            }
        }

        ;console.log("Scores: ", scoreObj);
        ;console.log("Level Score: ", tests[level].getScore())
        ;console.log("Lowest Score: ", lowestScore);

        if(won || level > (tests.length - 1) ){
            $(".window .result").html("You 🎓 Won!");
        } else if(tests[level].getScore() > 150 && lowestScore > 117) {
            $(".background .level").html("<div style='font-size: 2em;'>Level <span style='color: green; font-weight: bold;'>"+(level + 1)+"</style></div>");
            $(".window .result").html("Level 🎓 Up!!!");
            $(".background .history").append("<span class='graduate'>🎓</span><br>");
            levelUp();
        } else {
            var fakeLevels = [
                "x7T06dg",
                "h2G1s7l",
                "q6f2S0M",
                "e9J3a5I",
                "6g14pEn",
                "o9m52fa",
                "96d6Jc6",
            ];
            $(".background .level").html("Level "+level+". <input type='text' value='http://brainloader.shoutleaf.com/?hash=" + fakeLevels[level] + "'>");
        }

        //cleanup
        setQuestion(false);
        setTimeout(function() {
            $(".window .result").html("");
            $(".window").removeClass("js-showAnswer");
            $(".background").removeClass("js-correct");
            $(".background").removeClass("js-incorrect");
            buildTest();
        }, delay);
        ;console.groupEnd();
    };
    return {
        levelUp,
        skipToLevel,
        getQuestion,
        setQuestion,
        buildTest,
        checkGuess,
    }

});