define(["testCode", "components", "expressions"], function(testCode, components, expressions) {

    var getProbabilities = function(componentList){
        var l = componentList.length;
        var inverseList = [];
        var inverseTotal = 0;
        var probabilityList = [];

        for(i=0;i<l;i++){
            if(typeof componentList[i] == "undefined") {
                debugger;
            }
            var inverseScore = 1 / (componentList[i].getScore());
            inverseScore = inverseScore ** 2; //higher numbers increase the income gap
            inverseList.push(inverseScore);
            inverseTotal += inverseScore;
        }
        for(i=0;i<l;i++){
            probabilityList.push(inverseList[i]/inverseTotal);
        }
        ;var check = 0;
        ;for(i=0;i<l;i++){
        ;   check += probabilityList[i];
        ;}


        ;console.log(probabilityList, check);
        return probabilityList;
    };

    var getPoints = function(componentList){
        var points = [];
        for(getPointsId=0;getPointsId<componentList.length;getPointsId++){
            points.push(componentList[getPointsId].getScore());
        }
        return points;
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
            console.log("the answer will be FALSE");
            var errLocation = chooseCode(componentList);

            //get each component
            for(i=0;i<componentList.length;i++){
                if(i===errLocation){
                    testString += componentList[i].get(false);
                } else {
                    testString += componentList[i].get(true);
                }
            }
            return {
                string: testString,
                answer: false,
                errLocation: errLocation,
                components: componentList
            };
        } else {
            console.log("the answer will be TRUE");
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


    return {makeTest, chooseCode, getPoints};
});

