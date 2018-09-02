$(function(){
    requirejs(
    ["utils", "components", "expressions", "question",
    "qList"],
    function(utils, components, expressions, question,
    qList) {
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
        if(document.cookie){
            debugger;
            question.skipToLevel(document.cookie.level);
        }
        question.buildTest();
    });
});