$(function(){
    requirejs(
    ["utils", "components", "expressions", "test",
    "tests"],
    function(utils, components, expressions, test,
    tests) {
        $(document).on("keyup", function(e){
            if(test.getQuestion()){
                if(e.which == 39){ //right arrow
                    test.checkGuess(true);
                } else if(e.which == 37){ //left arrow
                    test.checkGuess(false);
                }
            } else {
                console.log ("whoa there! Slow down!")
            }
        });
        var urlLevel = utils.getUrlParameter("hash");
        if(urlLevel){
            test.skipToLevel(urlLevel[3]);
        }
        test.buildTest();
    });
});