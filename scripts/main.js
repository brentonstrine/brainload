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

        if (document.cookie.split(';').filter(function(item) {
            return item.indexOf('level=') >= 0;
        }).length) {
            ;debugger;
            var level = document.cookie.replace(/(?:(?:^|.*;\s*)level\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            question.skipToLevel(level);
        }
        question.buildTest();
    });
});