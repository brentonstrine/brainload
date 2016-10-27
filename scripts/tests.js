define(["testCode", "components", "expressions", "codeUtils"],
function(testCode, components, expressions, codeUtils) {
    return [
        //0, var x;
        // Object.create(testCode.testCodePrototype(), {
        //     get: {value: function(answerType){
        //         var name = "Block Var Declaration";
        //         var expressionsList = [
        //              expressions.varDeclaration,
        //         ];
        //         var test = codeUtils.makeTest(answerType, expressionsList, name);
        //         return test;
        //     }}
        // }),
        // 1, var x; x=num;
        Object.create(testCode.testCodePrototype(), {
            get: {value: function(answerType){
                var name = "Block Var Declaration and Assignment";
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
                // two lines:
                // var x;
                // var x;

                // choose which line will have the error
                var answerTypeList = [true, true];
                if(answerType==false){
                    answerTypeList[codeUtils.getRandomFrom(0,1)] = false;
                }
                components.identifier.setSpecialPart();
                var line1 = expressions.varDeclaration.get(answerTypeList[0]);
                var line2 = expressions.assignmentStr.get(answerTypeList[1]);
                components.identifier.clearSpecialPart();
                return {
                    lines: [line1, line2],
                    answer: answerType,
                };
            }}
        }),
        // 3, var x; x={};
        Object.create(testCode.testCodePrototype(), {
            get: {value: function(answerType){
                // two lines:
                // var x;
                // var x;

                // choose which line will have the error
                var answerTypeList = [true, true];
                if(answerType==false){
                    answerTypeList[codeUtils.getRandomFrom(0,1)] = false;
                }
                components.identifier.setSpecialPart();
                var line1 = expressions.varDeclaration.get(answerTypeList[0]);
                var line2 = expressions.assignmentObj.get(answerTypeList[1]);
                components.identifier.clearSpecialPart();
                return {
                    lines: [line1, line2],
                    answer: answerType,
                };
            }}
        }),
        //
        Object.create(testCode.testCodePrototype(), {
            get: {value: function(answerType){
                // two lines:
                // var x;
                // var x;

                // choose which line will have the error
                var answerTypeList = [true, true, true];
                if(answerType==false){
                    answerTypeList[codeUtils.getRandomFrom(0,2)] = false;
                }
                var line1 = expressions.varDeclaration.get(answerTypeList[0]);
                var line2 = expressions.assignmentStr.get(answerTypeList[1]);
                var line3 = expressions.assignmentStr.get(answerTypeList[2]);
                return {
                    lines: [line1, line2, line3],
                    answer: answerType,
                };
            }}
        }),
        Object.create(testCode.testCodePrototype(), {
            get: {value: function(answerType){
                // two lines:
                // var x;
                // x = 5;
                var line1 = expressions.varDeclaration.get(answerType);
                var line2 = expressions.assignment.get(answerType);

                return {
                    string
                };
            }}
        })
    ];
});

//
// return {
//     string: testString,
//     answer: true,
//     errLocation: null,
//     parts: componentList
// };