define(["testCode", "components", "codeUtils"],
function(testCode, components, codeUtils) {
        // Expressions and operators.
        var varDeclaration = Object.create(testCode.testCodePrototype(), {
            get: {value: function(type){
                var expressions = [this];
                var componentsList = [
                    components.variable,
                    components.space,
                    components.identifier,
                    components.semicolon
                ];
                var test = codeUtils.makeTest(type, componentsList, "Expression varDeclaration");
                return test;
            }}
        });
        var assignmentNum = Object.create(testCode.testCodePrototype(), {
            get: {value: function(type){
                var componentsList = [
                    components.identifier,//x
                    components.space,//
                    components.assignment,//=
                    components.space,       //
                    components.number,//5
                    components.semicolon//;
                ];
                var test = codeUtils.makeTest(type, componentsList, "Expression assignmentNum");
                return test;
            }}
        });
        var assignmentStr = Object.create(testCode.testCodePrototype(), {
            get: {value: function(type){
                var componentsList = [
                    components.identifier,
                    components.space,
                    components.assignment,
                    components.space,
                    components.string,
                    components.semicolon
                ];
                var test = codeUtils.makeTest(type, componentsList, "Expression assignmentStr");
                return test;
            }}
        });
        var assignmentObj = Object.create(testCode.testCodePrototype(), {
            get: {value: function(type){
                var componentsList = [
                    components.identifier,
                    components.space,
                    components.assignment,
                    components.space,
                    components.object,
                    components.semicolon
                ];
                var test = codeUtils.makeTest(type, componentsList, "Expression assignmentObj");
                return test;
            }}
        });
    return {varDeclaration, assignmentNum, assignmentStr, assignmentObj};
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
