define(["questionPrototype", "components", "codeUtils", "utils"],
function(questionPrototype,   components,   codeUtils,   utils) {
        // Expressions and operators.
// var x;
        var varDeclaration = Object.create(questionPrototype.questionPrototype(), {
            get: {value: function(type){
                var expressions = [this];
                var componentsList = [
                    components.variable,
                    components.space,
                    components.identifier,
                    components.semicolon
                ];
                var expression = codeUtils.makeTest(type, componentsList, "Expression-varDeclaration");
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
// x = value;
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
                var expression = codeUtils.makeTest(type, componentsList, "Expression-assignmentVal");
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
// x = value + value;
        var assignmentOp = Object.create(questionPrototype.questionPrototype(), {
            get: {value: function(type){
                var componentsList = [ // x = 4 + 4;
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
                var expression = codeUtils.makeTest(type, componentsList, "Expression-assignmentVal");
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
// x = 5;
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
                var expression = codeUtils.makeTest(type, componentsList, "Expression-assignmentNum");
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
// x = "str";
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
                var expression = codeUtils.makeTest(type, componentsList, "Expression-assignmentStr");
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
// x = {};
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
                var expression = codeUtils.makeTest(type, componentsList, "Expression-assignmentObj");
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
// x = {
        var assignmentObjStart = Object.create(questionPrototype.questionPrototype(), {
            get: {value: function(type){
                var componentsList = [
                    components.identifier,
                    components.space,
                    components.assignment,
                    components.space,
                    components.openCurly,
                ];
                var expression = codeUtils.makeTest(type, componentsList, "Expression-assignmentObjStart");
                expression.string = "<div>" + expression.string + "</div>";
                return expression;
            }},
            getParts: {value: function(type){
                return [
                    components.identifier,
                    components.space,
                    components.assignment,
                    components.space,
                    components.openCurly,
                ];
            }},
        });
// };
        var objEnd = Object.create(questionPrototype.questionPrototype(), {
            get: {value: function(type){
                var componentsList = [
                    components.closeCurly,
                    components.semicolon,
                ];
                var expression = codeUtils.makeTest(type, componentsList, "Expression-assignmentObjEnd");
                expression.string = "<div>" + expression.string + "</div>";
                return expression;
            }},
            getParts: {value: function(type){
                return [
                    components.closeCurly,
                    components.semicolon,
                ];
            }},
        });
// >> z: value,
        var objKeyValue = Object.create(questionPrototype.questionPrototype(), {
            get: {value: function(type){
                var componentsList = [
                    components.indent,
                    components.identifierUnique,
                    components.colon,
                    components.space,
                    components.value,
                    components.comma,
                ];
                var expression = codeUtils.makeTest(type, componentsList, "Expression-objKeyValue");
                expression.string = "<div>" + expression.string + "</div>";
                return expression;
            }},
            getParts: {value: function(type){
                return [
                    components.indent,
                    components.identifierUnique,
                    components.colon,
                    components.space,
                    components.value,
                    components.comma,
                ];
            }},
        });
// if(bool){
    var conditionStart = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var componentsList = [
                components.iff,
            ];
            var expression = codeUtils.makeTest(type, componentsList, "Expression-conditionStart");
            expression.string = "<div>" + expression.string + "</div>";
            return expression;
        }},
        getParts: {value: function(type){
            return [
                components.iff,
            ];
        }},
    });
// }
    var conditionEnd = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var componentsList = [
                components.closeCurly,
            ];
            var expression = codeUtils.makeTest(type, componentsList, "Expression-conditionStart");
            expression.string = "<div>" + expression.string + "</div>";
            return expression;
        }},
        getParts: {value: function(type){
            return [
                components.closeCurly
            ];
        }},
    });
// >> code
    var blockedCode = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var componentsList = getBlock();
            var expression = codeUtils.makeTest(type, componentsList, "Expression-conditionStart");
            expression.string = "<div>" + expression.string + "</div>";
            return expression;
        }},
        getParts: {value: function(type){
            return getBlock();
        }},
    });
// var x = function(){}
    var functionStart = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var componentsList = [
                components.identifier,
                components.space,
                components.assignment,
                components.space,
                components.functionStart,
            ];
            var expression = codeUtils.makeTest(type, componentsList, "Expression-conditionStart");
            expression.string = "<div>" + expression.string + "</div>";
            return expression;
        }},
        getParts: {value: function(type){
            return [
                components.identifier,
                components.space,
                components.assignment,
                components.space,
                components.functionStart,
            ];
        }},
    });

//SIMPLE HELPER FUNCTIONS

//values
var getBlock  = function(){
    var list = utils.pickFromArr([
        [
            components.indent,
            components.variable,
            components.space,
            components.identifier,
            components.space,
            components.assignment,
            components.space,
            components.string,
            components.semicolon
        ],
        [ // x = 4 + 4;
            components.indent,
            components.variable,
            components.space,
            components.identifier,
            components.space,
            components.assignment,
            components.space,
            components.value,
            components.space,
            components.operator,
            components.space,
            components.value,
            components.semicolon
        ],
        [
            components.indent,
            components.variable,
            components.space,
            components.identifier,
            components.space,
            components.assignment,
            components.space,
            components.value,
            components.semicolon
       ],
    ]);

    return list;
};
    return {
        varDeclaration,
        assignmentNum,
        assignmentStr,
        assignmentObj,
        assignmentObjStart,
        assignmentVal,
        assignmentOp,
        objKeyValue,
        objEnd,
        conditionStart,
        blockedCode,
        conditionEnd,
        functionStart,
    };
});