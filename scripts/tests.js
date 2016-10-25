define(["testCode", "components", "expressions", "codeUtils"],
function(testCode, components, expressions, codeUtils) {
    return [
        Object.create(testCode.testCodePrototype, {
            get: {value: function(type){
                // var x;
                var fragment = expressions.varDeclaration.get(type);
                return {lines: [fragment], answer: type};
            }}
        }),
        Object.create(testCode.testCodePrototype, {
            get: {value: function(type){
                // two lines:
                // var x;
                // var x;
                var line1 = expressions.varDeclaration.get(type);
                var line2 = expressions.varDeclaration.get(type);

                return {lines: [line1, line2], answer: type};
            }}
        })
    ];
});
