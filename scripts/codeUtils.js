define(["testCode", "components", "expressions"], function(testCode, components, expressions) {

    var getProbabilities = function(componentList){
        var l = componentList.length;
        var inverseList = [];
        var inverseTotal = 0;
        var probabilityList = [];

        for(i=0;i<l;i++){
            var inverseScore = 1 / (componentList[i].getScore() + .1);
            inverseList.push(inverseScore);
            inverseTotal += inverseScore;
        }
        for(i=0;i<l;i++){
            probabilityList.push(inverseList[i]/inverseTotal);
        }
        return probabilityList;
    };

    var chooseCode = function(componentList){
        var probabilityList = getProbabilities(componentList);
        var r = Math.random();
        for(i=0;i<componentList.length;i++){
            if(r < probabilityList[i]){
                return i;
            }
            r = r - probabilityList[i];
        }
    };

    var makeTest = function(type, componentList){
        var testString = "";

        //answer to this test is FALSE
        if(!type){
            var probabilityList = getProbabilities(componentList);
            var errLocation = false;
            var r = Math.random();
            for(i=0;i<componentList.length;i++){
                if(errLocation === false && r < probabilityList[i]){
                    errLocation = i;
                    testString += componentList[i].get(false);
                    continue;
                }
                testString += componentList[i].get(true);
                r -= probabilityList[i];
            }
            return {
                string: testString,
                answer: false,
                errLocation: errLocation,
                components: componentList
            };
        } else {
            for(i=0;i<componentList.length;i++){
                testString += componentList[i].get(true);
            }
            return {
                string: testString,
                answer: true,
                errLocation: null,
                components: componentList
            };
        }
    };


    return {makeTest, chooseCode};
});

