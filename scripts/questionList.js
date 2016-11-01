define(["testCode", "components", "expressions", "codeUtils"],
function(testCode, components, expressions, codeUtils) {
    return [
        //0, var x;
        Object.create(testCode.testCodePrototype(), {
            get: {value: function(answerType){
                var name = "Block Var Declaration";
                var expressionsList = [
                     expressions.varDeclaration,
                ];
                var question = codeUtils.makeTest(answerType, expressionsList, name);
                return question;
            }}
        }),
        //1, var x; x=num;
        Object.create(testCode.testCodePrototype(), {
            get: {value: function(answerType){
                var name = "Block Var Declaration and Assignment";
                var expressionsList = [
                     expressions.varDeclaration,
                     expressions.assignmentVal
                ];
                components.identifier.setSpecialPart();
                var question = codeUtils.makeTest(answerType, expressionsList, name);
                components.identifier.clearSpecialPart();

                return question;
            }}
        }),
        //2
        Object.create(testCode.testCodePrototype(), {
            get: {value: function(answerType){
                var name = "Block Var Declaration and Two String Assignments";
                var expressionsList = [
                     expressions.varDeclaration,
                     expressions.assignmentVal,
                     expressions.assignmentVal,
                ];
                components.identifier.setSpecialPart();
                var question = codeUtils.makeTest(answerType, expressionsList, name);
                components.identifier.clearSpecialPart();

                return question;
            }}
        }),
        //3
        Object.create(testCode.testCodePrototype(), {
            get: {value: function(answerType){
                var name = "Block. Assign to operation.";
                var expressionsList = [
                     expressions.varDeclaration,
                     expressions.assignmentOp,
                ];
                components.identifier.setSpecialPart();
                var question = codeUtils.makeTest(answerType, expressionsList, name);
                components.identifier.clearSpecialPart();

                return question;
            }}
        }),
        // Object.create(testCode.testCodePrototype(), {
        //     get: {value: function(answerType){
        //         var name = "Block Var Declaration and Two String Assignments";
        //         var expressionsList = [
        //              expressions.varDeclaration,
        //              expressions.assignmentOpenObj,
        //              expressions.objAssignmentVal,
        //              expressions.closeObj,
        //         ];
        //         //var a;
        //         //a = {
        //         //  f: val
        //         //};
        //         components.identifier.setSpecialPart();
        //         var question = codeUtils.makeTest(answerType, expressionsList, name);
        //         components.identifier.clearSpecialPart();
        //
        //         return question;
        //     }}
        // }),
    ];
});