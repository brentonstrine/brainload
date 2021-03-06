define(
["utils", "questionPrototype", "components", "expressions",
"qList", "codeUtils"],
function(utils, questionPrototype, components, expressions,
qList, codeUtils) {

    var currentQuestion = true;
    var level = 0;
    var runCount = 0;
    var activeQuestionsList = [qList[0]];
    var parent = this;
    var won = false;
    var confettiTimeout = 0;
    var expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime()+(18*24*60*60*1000)); // 18 days from today
    expiresDate = expiresDate.toGMTString();

    var levelUp = function(){
        if( (level + 1) == qList.length ){
            won = true;
        } else {
            level++;
            activeQuestionsList.push(qList[level]);
            ;console.log("++++++++++++ LEVEL UP +++++++++++++");
        }
    };

    var skipToLevel = function(level){
        level = parseInt(level);
        // rewrite starting level in history
        $history = $(".background .history").html(level + ": ");

        for(var i=0;i<level;i++){
            var expressionList;
            var componentList = [];

            //level up
            levelUp();

            // set level of this question
            activeQuestionsList[i].setScore( 150 + (10 * (level - i)));

            //get the expressions in this question
            expressionList = qList[i].getParts();

            //loop through expressions
            for(var j=0;j<expressionList.length;j++){

                //set expression score
                expressionList[j].setScore(120);

                //get the components in this question
                Array.prototype.push.apply(componentList, expressionList[j].getParts());
            }

            //loop through components
            for(var k=0;k<componentList.length;k++){
                //set the components in this question
                componentList[k].setScore(120);
            }
        }
    };

    var getQuestion = function(){
        return currentQuestion;
    };

    var setQuestion = function(q){
        currentQuestion = q;
    };

    var buildTest = function(){
        ;console.group("buildTest() at level "+ level);

        //decide if question will be true or false
        var testType = Math.round(Math.random());

        //pick which code we're going to test
        var testId = codeUtils.chooseCode(activeQuestionsList);
        var qObject = activeQuestionsList[testId];
        if(qObject == undefined || typeof qObject == undefined) {
            ;debugger;
        }
        var qResult = qObject.get(testType);
        setQuestion({object: qObject, guess: qResult});

        // insert question code into window
        $(".window .code").html(qResult.string);

        ;console.groupEnd();
    };


    var checkGuess = function(guess) {
        ;console.group("checkGuess()");
        ;console.log("guess        : ", Boolean(guess));
        var delay = 200;
        var currentQuestion = getQuestion();
        var questionObject = currentQuestion.object;
        var question = currentQuestion.guess;
        var correctAnswer = question.answer;
        var score = (guess == correctAnswer) ? true : false;

        ;console.log("correctAnswer: ", Boolean(correctAnswer));
        ;console.log("questionScore: ", score);
        var points;
        if(score){
        // Correct
            //award more points if the correctAnswer was false.
            points = (correctAnswer == true) ? 10 : 2;
            $(".background").addClass("js-correct");
            var emoji = "✅ ";// utils.pickFromArr(["👌","💯", "👍", "🙌", "🙆", "👏", "✅", "🤘", "🎉", "💃", "👯", "🎊", "😀", "😉", "😊", "😋", "😍", "😘", "🤗", "🤓", "😛", "😜", "😝"])
            $(".window .result").html(emoji);
            $(".background .history").append(emoji);
        } else {
        // Incorrect
            //deduct more points if the correctAnswer was false.
            points = (correctAnswer == true) ? -5 : -10;
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

        ;console.log("QuestionPoints: " + questionObject.getScore())


        // loop through each expression
        for(var i=0;i<question.guessList.length;i++){
            console.group("Expression");

            var thisExpression = question.guessList[i];
            var thisExpressionObject = question.components[i];

            //update expression score
            thisExpressionObject.updateScore(points);

            //get score of expression
            scoreObj[i] = {expression: thisExpressionObject.getScore()};
            scoreObj[i].components = [];

            if(thisExpression.answer===false){// if the correct answer was false for this expression

                //only update score of trick part
                var errLoc = thisExpression.errLocation;
                thisExpression.components[errLoc].updateScore(points);
                thisExpression.components[errLoc].addToHistory(score);

                //get score of each component
                for(var j=0;j<thisExpression.components.length;j++){

                    var thisScore = thisExpression.components[j].getScore();
                    scoreObj[i].components[j] = thisScore;

                    //;console.log("|f/ e"+i+".c"+j+": " + )
                    ;console.log("|f/"+thisExpression.components[j].get().name, "+"+points+"=",thisExpression.components[j].getScore());

                    if(thisScore < lowestScore){
                        lowestScore = thisScore;
                    }
                }
            } else {//if the correctAnswer was true, update score of all parts

                for(var j=0;j<thisExpression.components.length;j++){
                    //debugger;
                    //update all component scores
                    thisExpression.components[j].updateScore(points);//this is a bug. components that appear multiple times are boosted or subtracted multiple times.
                    thisExpression.components[j].addToHistory(score);

                    //get score of components
                    var thisScore = thisExpression.components[j].getScore();
                    scoreObj[i].components[j] = thisScore;
                    //;console.log("|t/ e" + i + ".c"+j+": " + )
                    ;console.log("|t/",thisExpression.components[j].get().name, "+"+points+"=", thisExpression.components[j].getScore());

                    if(thisScore < lowestScore){
                        lowestScore = thisScore;
                    }
                }
            }
            console.groupEnd();
        }

        ;console.log("Scores: ", scoreObj);
        ;console.log("Level Score: ", qList[level].getScore())
        ;console.log("Lowest Score: ", lowestScore);
        // Check if score means we should level up
        if(won || level > (qList.length - 1) ){
            $(".window .result").html("You 🎓 Won!");
            confetti();
        } else if(qList[level].getScore() > 150 && lowestScore > 117) {
            confetti();
            var newLevel = parseInt(level) + 1;
            document.cookie = "level=" + newLevel + "; expires=" + expiresDate;
            $(".window .result").html("Level 🎓 Up!!!");
            $(".background .history").append("<span class='graduate'>🎓</span><br>" + newLevel + ": ");
            levelUp();
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
    var confetti = function(){
        $(".confetti").show();
        clearTimeout(confettiTimeout);
        confettiTimeout = setTimeout(function() {
            $(".confetti").hide();
        }, 5000);
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
