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
                var test = codeUtils.makeTest(answerType, expressionsList, name);
                return test;
            }}
        }),
        //1, var x; x=num;
        Object.create(testCode.testCodePrototype(), {
            get: {value: function(answerType){
                var name = "Block Var Declaration and Number Assignment";
                var expressionsList = [
                     expressions.varDeclaration,
                     expressions.assignmentNum
                ];
                components.identifier.setSpecialPart();
                var test = codeUtils.makeTest(answerType, expressionsList, name);
                components.identifier.clearSpecialPart();

                return test;
            }}
        }),
        // 2, var x; x="str";
        Object.create(testCode.testCodePrototype(), {
            get: {value: function(answerType){
                var name = "Block Var Declaration and String Assignment";
                var expressionsList = [
                     expressions.varDeclaration,
                     expressions.assignmentStr
                ];
                components.identifier.setSpecialPart();
                var test = codeUtils.makeTest(answerType, expressionsList, name);
                components.identifier.clearSpecialPart();

                return test;
            }}
        }),
        // 3, var x; x={};
        Object.create(testCode.testCodePrototype(), {
            get: {value: function(answerType){
                var name = "Block Var Declaration and Object Assignment";
                var expressionsList = [
                     expressions.varDeclaration,
                     expressions.assignmentObj
                ];
                components.identifier.setSpecialPart();
                var test = codeUtils.makeTest(answerType, expressionsList, name);
                components.identifier.clearSpecialPart();

                return test;
            }}
        }),
        //
        Object.create(testCode.testCodePrototype(), {
            get: {value: function(answerType){
                var name = "Block Var Declaration and Two String Assignments";
                var expressionsList = [
                     expressions.varDeclaration,
                     expressions.assignmentStr,
                     expressions.assignmentStr,
                ];
                components.identifier.setSpecialPart();
                var test = codeUtils.makeTest(answerType, expressionsList, name);
                components.identifier.clearSpecialPart();

                return test;
            }}
        }),
    ];
});