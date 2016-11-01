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
                var expression = codeUtils.makeTest(type, componentsList, "Expression varDeclaration");
                expression.string = "<div>" + expression.string + "</div>";
                return expression;
            }}
        });
        var assignmentVal = Object.create(testCode.testCodePrototype(), {
            get: {value: function(type){
                var componentsList = [
                    components.identifier,
                    components.space,
                    components.assignment,
                    components.space,
                    components.value,
                    components.semicolon
                ];
                var expression = codeUtils.makeTest(type, componentsList, "Expression assignmentVal");
                expression.string = "<div>" + expression.string + "</div>";
                return expression;
            }}
        });
        var assignmentNum = Object.create(testCode.testCodePrototype(), {
            get: {value: function(type){
                var componentsList = [
                    components.identifier,
                    components.space,
                    components.assignment,
                    components.space,
                    components.number,
                    components.semicolon
                ];
                var expression = codeUtils.makeTest(type, componentsList, "Expression assignmentNum");
                expression.string = "<div>" + expression.string + "</div>";
                return expression;
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
                var expression = codeUtils.makeTest(type, componentsList, "Expression assignmentStr");
                expression.string = "<div>" + expression.string + "</div>";
                return expression;
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
                    components.semicolon,
                ];
                var expression = codeUtils.makeTest(type, componentsList, "Expression assignmentObj");
                expression.string = "<div>" + expression.string + "</div>";
                return expression;
            }}
        });
        var assignmentOp = Object.create(testCode.testCodePrototype(), {
            get: {value: function(type){
                var componentsList = [
                    components.identifier,
                    components.space,
                    components.assignment,
                    components.space,
                    components.number,
                    components.space,
                    components.operator,
                    components.space,
                    components.number,
                    components.semicolon
                ];
                var expression = codeUtils.makeTest(type, componentsList, "Expression assignmentObj");
                expression.string = "<div>" + expression.string + "</div>";
                return expression;
            }}
        });
    return {varDeclaration, assignmentNum, assignmentStr, assignmentObj, assignmentVal, assignmentOp};
});