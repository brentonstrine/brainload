$(function(){
    requirejs(
    ["utils", "components", "expressions", "patterns", "test"],
    function(utils, components, expressions, patterns, test) {
        $(document).on("keyup", function(e){
            if(e.which == 39){ //right arrow
                test.checkResult(true);
            } else if(e.which == 37){ //left arrow
                test.checkResult(false);
            }
        });
expressions.varDeclaration.get()

        console.log(components);
        console.log(expressions);
        console.log(patterns);
        test.runTest();
    });
});