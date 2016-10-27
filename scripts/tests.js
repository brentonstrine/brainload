define(["testCode", "components", "expressions", "codeUtils"],
function(testCode, components, expressions, codeUtils) {
    return [
        //0, var x;
        Object.create(testCode.testCodePrototype(), {
            get: {value: function(type){
                // var x;
                debugger;
                var fragment = expressions.varDeclaration.get(type);
                return {lines: [fragment], answer: type};
            }}
        }),
        // 1, var x; x=num;
        Object.create(testCode.testCodePrototype(), {
            get: {value: function(type){
                // two lines:
                // var x;
                // var x;

                // choose which line will have the error
                var typeList = [true, true];
                if(type==false){
                    typeList[codeUtils.getRandomFrom(0,1)] = false;
                }

                components.identifier.setSpecialPart();
                var line1 = expressions.varDeclaration.get(typeList[0]);
                var line2 = expressions.assignmentNum.get(typeList[1]);
                components.identifier.clearSpecialPart();

                return {
                    lines: [line1, line2],
                    answer: type,
                };
            }}
        }),
        // 2, var x; x="str";
        Object.create(testCode.testCodePrototype(), {
            get: {value: function(type){
                // two lines:
                // var x;
                // var x;

                // choose which line will have the error
                var typeList = [true, true];
                if(type==false){
                    typeList[codeUtils.getRandomFrom(0,1)] = false;
                }
                components.identifier.setSpecialPart();
                var line1 = expressions.varDeclaration.get(typeList[0]);
                var line2 = expressions.assignmentStr.get(typeList[1]);
                components.identifier.clearSpecialPart();
                return {
                    lines: [line1, line2],
                    answer: type,
                };
            }}
        }),
        // 3, var x; x={};
        Object.create(testCode.testCodePrototype(), {
            get: {value: function(type){
                // two lines:
                // var x;
                // var x;

                // choose which line will have the error
                var typeList = [true, true];
                if(type==false){
                    typeList[codeUtils.getRandomFrom(0,1)] = false;
                }
                components.identifier.setSpecialPart();
                var line1 = expressions.varDeclaration.get(typeList[0]);
                var line2 = expressions.assignmentObj.get(typeList[1]);
                components.identifier.clearSpecialPart();
                return {
                    lines: [line1, line2],
                    answer: type,
                };
            }}
        }),
        //
        Object.create(testCode.testCodePrototype(), {
            get: {value: function(type){
                // two lines:
                // var x;
                // var x;

                // choose which line will have the error
                var typeList = [true, true, true];
                if(type==false){
                    typeList[codeUtils.getRandomFrom(0,2)] = false;
                }
                var line1 = expressions.varDeclaration.get(typeList[0]);
                var line2 = expressions.assignmentStr.get(typeList[1]);
                var line3 = expressions.assignmentStr.get(typeList[2]);
                return {
                    lines: [line1, line2, line3],
                    answer: type,
                };
            }}
        }),
        Object.create(testCode.testCodePrototype(), {
            get: {value: function(type){
                // two lines:
                // var x;
                // x = 5;
                var line1 = expressions.varDeclaration.get(type);
                var line2 = expressions.assignment.get(type);

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