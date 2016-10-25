define(["testCode", "components", "expressions"], function(testCode, components, expressions) {

    var getProbabilities = function(codeList){
        var l = codeList.length;
        var inverseList = [];
        var inverseTotal = 0;
        var probabilityList = [];

        for(i=0;i<l;i++){
            var inverseScore = 1 / (codeList[i].getScore() + .1);
            inverseList.push(inverseScore);
            inverseTotal += inverseScore;
        }
        for(i=0;i<l;i++){
            probabilityList.push(inverseList[i]/inverseTotal);
        }
        return probabilityList;
    };

    var chooseCode = function(codeList){
        var probabilityList = getProbabilities(codeList);
        var r = Math.random();
        for(i=0;i<codeList.length;i++){
            if(r < probabilityList[i]){
                return i;
            }
            r = r - probabilityList[i];
        }
    };

    var makeTest = function(codeList){
        var probabilityList = getProbabilities(codeList);
        var testString = "";
        var errLocation = false;

        var r = Math.random();
        for(i=0;i<codeList.length;i++){
            if(errLocation === false && r < probabilityList[i]){
                errLocation = i;
                testString += codeList[i].get(false);
                continue;
            }
            testString += codeList[i].get(true);
            r -= probabilityList[i];
        }
        return [testString, errLocation];
    };

    return {makeTest, chooseCode};
});

