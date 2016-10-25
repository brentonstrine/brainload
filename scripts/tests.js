define(["testCode", "components", "expressions", "codeUtils"],
function(testCode, components, expressions, codeUtils) {
    return [
        Object.create(testCode.testCodePrototype, {
            get: {value: function(type){
                // var x;
                var fragment = expressions.varDeclaration.get();
                return fragment;
            }}
        })
    ];
});
