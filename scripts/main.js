$(function(){
    requirejs(
    ["utils", "components", "expressions", "question",
    "questionList"],
    function(utils, components, expressions, question,
    questionList) {
        $(document).on("keyup", function(e){
            if(question.getQuestion()){
                if(e.which == 39){ //right arrow
                    question.checkGuess(true);
                } else if(e.which == 37){ //left arrow
                    question.checkGuess(false);
                }
            } else {
                console.log ("whoa there! Slow down!")
            }
        });
        var urlLevel = utils.getUrlParameter("hash");
        if(urlLevel){
            question.skipToLevel(urlLevel[3]);
        }
        question.buildTest();
    });
});