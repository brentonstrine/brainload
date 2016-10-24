define(["testCode", "components"], function(testCode, components) {
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
    return {test};
});