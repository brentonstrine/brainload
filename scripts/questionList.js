define(["questionPrototype", "components", "expressions", "codeUtils"],
function(questionPrototype, components, expressions, codeUtils) {
    return [
        //0, var x;
        Object.create(questionPrototype.questionPrototype(), {
            get: {value: function(answerType){
                var name = "Block-Var Declaration";
                var expressionsList = [
                     expressions.varDeclaration,
                ];
                var question = codeUtils.makeTest(answerType, expressionsList, name);
                return question;
            }},
            getParts: {value: function(type){
                return [
                    expressions.varDeclaration,
                ];
            }},
        }),
        //1, var x; x=num;
        Object.create(questionPrototype.questionPrototype(), {
            get: {value: function(answerType){
                var name = "Block-Var Declaration and Assignment";
                var expressionsList = [
                     expressions.varDeclaration,
                     expressions.assignmentVal
                ];
                components.identifier.setSpecialPart();
                var question = codeUtils.makeTest(answerType, expressionsList, name);
                components.identifier.clearSpecialPart();

                return question;
            }},
            getParts: {value: function(type){
                return [
                 expressions.varDeclaration,
                 expressions.assignmentVal
                ];
            }},
        }),
        //2
        Object.create(questionPrototype.questionPrototype(), {
            get: {value: function(answerType){
                var name = "Block-Var Declaration and Two Assignments";
                var expressionsList = [
                     expressions.varDeclaration,
                     expressions.assignmentVal,
                     expressions.assignmentVal,
                ];
                components.identifier.setSpecialPart();
                var question = codeUtils.makeTest(answerType, expressionsList, name);
                components.identifier.clearSpecialPart();

                return question;
            }},
            getParts: {value: function(type){
                return [
                    expressions.varDeclaration,
                    expressions.assignmentVal,
                ];
            }},
        }),
        //3
        Object.create(questionPrototype.questionPrototype(), {
            get: {value: function(answerType){
                var name = "Block-Assign to operation.";
                var expressionsList = [
                     expressions.varDeclaration,
                     expressions.assignmentOp,
                ];
                components.identifier.setSpecialPart();
                var question = codeUtils.makeTest(answerType, expressionsList, name);
                components.identifier.clearSpecialPart();

                return question;
            }},
            getParts: {value: function(type){
                return [
                 expressions.varDeclaration,
                 expressions.assignmentOp
                ];
            }},
        }),

        //4
        Object.create(questionPrototype.questionPrototype(), {
            get: {value: function(answerType){
                var name = "Block-Assign to object.";
                var keyValScore = expressions.objKeyValue.getScore();
                var expressionsList = [
                     expressions.varDeclaration,
                     expressions.assignmentObjStart,
                     expressions.objKeyValue,
                ];
                //add additional lines in the object as score of this expression goes up
                if(keyValScore > 120){
                    expressionsList.push(expressions.objKeyValue);
                } else if (keyValScore > 140) {
                    expressionsList.push(expressions.objKeyValue);
                } else if (keyValScore > 160) {
                    expressionsList.push(expressions.objKeyValue);
                } else if (keyValScore > 200){
                    expressionsList.push(expressions.objKeyValue);
                }
                expressionsList.push(expressions.objEnd);
                components.identifier.setSpecialPart();
                var question = codeUtils.makeTest(answerType, expressionsList, name);
                components.identifier.clearSpecialPart();

                return question;
            }},
            getParts: {value: function(type){
                var expressionsList = [
                     expressions.varDeclaration,
                     expressions.assignmentObjStart,
                     expressions.objKeyValue,
                ];
                //add additional lines in the object as score of this expression goes up
                if(keyValScore > 120){
                    expressionsList.push(expressions.objKeyValue);
                } else if (keyValScore > 140) {
                    expressionsList.push(expressions.objKeyValue);
                } else if (keyValScore > 160) {
                    expressionsList.push(expressions.objKeyValue);
                } else if (keyValScore > 200){
                    expressionsList.push(expressions.objKeyValue);
                }
                expressionsList.push(expressions.objEnd);

                return expressionsList;
            }},
        }),
    ];
});