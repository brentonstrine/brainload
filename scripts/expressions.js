define(["questionPrototype", "components", "codeUtils"],
function(questionPrototype, components, codeUtils) {
        // Expressions and operators.
        var varDeclaration = Object.create(questionPrototype.questionPrototype(), {
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
            }},
            getParts: {value: function(type){
                return [
                    components.variable,
                    components.space,
                    components.identifier,
                    components.semicolon
                ];
            }},
        });
        var assignmentVal = Object.create(questionPrototype.questionPrototype(), {
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
            }},
            getParts: {value: function(type){
                return [
                    components.identifier,
                    components.space,
                    components.assignment,
                    components.space,
                    components.value,
                    components.semicolon
                ];
            }},
        });
        var assignmentNum = Object.create(questionPrototype.questionPrototype(), {
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
            }},
            getParts: {value: function(type){
                return [
                    components.identifier,
                    components.space,
                    components.assignment,
                    components.space,
                    components.number,
                    components.semicolon
                ];
            }},
        });
        var assignmentStr = Object.create(questionPrototype.questionPrototype(), {
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
            }},
            getParts: {value: function(type){
                return [
                    components.identifier,
                    components.space,
                    components.assignment,
                    components.space,
                    components.string,
                    components.semicolon
                ];
            }},
        });
        var assignmentObj = Object.create(questionPrototype.questionPrototype(), {
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
            }},
            getParts: {value: function(type){
                return [
                    components.identifier,
                    components.space,
                    components.assignment,
                    components.space,
                    components.object,
                    components.semicolon,
                ];
            }},
        });
        var assignmentOp = Object.create(questionPrototype.questionPrototype(), {
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
            }},
            getParts: {value: function(type){
                return [
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
            }},
        });
    return {varDeclaration, assignmentNum, assignmentStr, assignmentObj, assignmentVal, assignmentOp};
});