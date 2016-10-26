define(["testCode", "components", "codeUtils"], function(testCode, components, codeUtils) {
        // Expressions and operators.
        var test = Object.create(testCode.testCodePrototype(), {
            score: {value: 0},
            history: {value: []},
            get: {value: function(type){
                var fragment;
                fragment = components.test.get(true);
                fragment = components.test.get();
                fragment = components.test.get();
                fragment = components.test.get();
                return fragment;
            }}
        });
        var varDeclaration = Object.create(testCode.testCodePrototype(), {
            score: {value: 0},
            history: {value: []},
            get: {value: function(type){
                var expressions = [this];
                var componentsList = [
                    components.variable,
                    components.space,
                    components.identifier,
                    components.semicolon
                ];
                var test = codeUtils.makeTest(type, componentsList, expressions);
                return test;
            }}
        });
        var assignmentNum = Object.create(testCode.testCodePrototype(), {
            score: {value: 0},
            history: {value: []},
            get: {value: function(type){
                var expressions = [this];
                var componentsList = [
                    components.identifier,
                    components.space,
                    components.assignment,
                    components.space,
                    components.number,
                    components.semicolon
                ];
                var test = codeUtils.makeTest(type, componentsList, expressions);
                return test;
            }}
        });
    return {test, varDeclaration, assignmentNum};
});

// component
// expression
// line
// codeTest
//
// e: c,c,c
// l: e,e,e
// c: l,l,l
// [ assignment ] c:a, c:s, c:=, c:s, e:o, c:s, c:;
//      [opera] c:x, c:s, c:+, c:s, c:y
// [a = [x + y];]
