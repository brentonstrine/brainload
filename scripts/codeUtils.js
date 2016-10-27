define(["testCode", "components", "expressions"], function(testCode, components, expressions) {

    var getProbabilities = function(partList){
        var l = partList.length;
        var inverseList = [];
        var inverseTotal = 0;
        var probabilityList = [];

        for(i=0;i<l;i++){
            if(typeof partList[i] == "undefined") {
                debugger;
            }
            var inverseScore = 1 / (partList[i].getScore());
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


        //;console.log(probabilityList, check);
        return probabilityList;
    };

    var getPoints = function(partList){
        var points = [];
        for(getPointsId=0;getPointsId<partList.length;getPointsId++){
            points.push(partList[getPointsId].getScore());
        }
        return points;
    };

    // getRandomProportionallyFrom
    var chooseCode = function(partList){
        var probabilityList = getProbabilities(partList);
        var r = Math.random();
        for(i=0;i<partList.length;i++){
            if(r < probabilityList[i]){
                return i;
            }
            r = r - probabilityList[i];
        }
    };

    //random randomly
    var getRandomFrom = function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var makeTest = function(answerType, partList, name){
        var testString = "";
        //answer to this test is FALSE
        if(!answerType){
            //console.log("the answer will be FALSE");
            var errLocation = chooseCode(partList);

            //get each component
            for(i=0;i<partList.length;i++){
                if(i===errLocation){
                    testString += partList[i].get(false);
                } else {
                    testString += partList[i].get(true);
                }
            }
            return {
                string: testString,
                answer: false,
                errLocation: errLocation,
                components: partList
            };
        } else {
            for(i=0;i<partList.length;i++){
                testString += partList[i].get(true);
            }
            return {
                name: name,
                string: testString,
                answer: true,
                errLocation: null,
                components: partList
            };
        }
    };


    return {makeTest, chooseCode, getPoints, getRandomFrom};
});

