$(function(){
    requirejs(
    ["utils", "components", "expressions", "patterns", "test",
    "tests"],
    function(utils, components, expressions, patterns, test,
    tests) {
        $(document).on("keyup", function(e){
            if(test.getQuestion()){
                if(e.which == 39){ //right arrow
                    test.checkResult(true);
                } else if(e.which == 37){ //left arrow
                    test.checkResult(false);
                }
            } else if(e.which == 40){ //down arrow
                test.runTest2();
            } else {
                console.log ("whoa there! Slow down!")
            }
        });

        test.levelUp();
        test.runTest2();
    });
});