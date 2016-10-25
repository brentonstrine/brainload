define(["testCode", "components", "codeUtils"], function(testCode, components, codeUtils) {
        // Expressions and operators.
        var test = Object.create(testCode.testCodePrototype, {
            get: {value: function(type){
                var fragment;
                fragment = components.test.get(true);
                fragment = components.test.get();
                fragment = components.test.get();
                fragment = components.test.get();
                return fragment;
            }}
        });
        var varDeclaration = Object.create(testCode.testCodePrototype, {
            get: {value: function(type){
                var parts = [
                    components.variable,
                    components.space,
                    components.identifier,
                    components.semicolon
                ];
                var test = codeUtils.makeTest(parts);
                var testString = test[0];
                var testErr = test[1];
                return testString;
            }}
        });
    return {test, varDeclaration};
});
