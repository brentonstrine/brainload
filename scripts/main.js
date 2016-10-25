$(function(){
    requirejs(
    ["utils", "components", "expressions", "patterns", "test",
    "tests"],
    function(utils, components, expressions, patterns, test,
    tests) {
        $(document).on("keyup", function(e){
            if(e.which == 39){ //right arrow
                test.checkResult(true);
            } else if(e.which == 37){ //left arrow
                test.checkResult(false);
            }
        });
        test.runTest2();
    });
});