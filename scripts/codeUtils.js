define(["questionPrototype", "components", "expressions"], function(questionPrototype, components, expressions) {

    var getProbabilities = function(partList){
        var l = partList.length;
        var inverseList = [];
        var inverseTotal = 0;
        var probabilityList = [];
        for(var i=0;i<l;i++){
            if(typeof partList[i] == "undefined") {console.log("PROBLEM")}
            var inverseScore = 1 / (partList[i].getScore());
            inverseScore = inverseScore ** 2; //higher numbers increase the income gap
            inverseList.push(inverseScore);
            inverseTotal += inverseScore;
        }
        for(var i=0;i<l;i++){
            probabilityList.push(inverseList[i]/inverseTotal);
        }
        ;var check = 0;
        ;for(var i=0;i<l;i++){
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
        for(var i=0;i<partList.length;i++){
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
        var guessList = [];
        //answer to this question is FALSE
        if(!answerType){
            //console.log("the answer will be FALSE");
            var errLocation = chooseCode(partList);

            //get each component
            for(var i=0;i<partList.length;i++){
                if(i===errLocation){
                    var result = partList[i].get(false);
                    guessList.push(result);
                    testString += result.string;
                } else {
                    var result = partList[i].get(true)
                    guessList.push(result);
                    testString += result.string;
                }
            }
            return {
                name: name,
                string: testString,
                answer: answerType,
                errLocation: errLocation,
                components: partList,
                guessList: guessList
            };
        } else {
            for(var i=0;i<partList.length;i++){
                var result = partList[i].get(true);
                guessList.push(result);
                testString += result.string;
            }
            return {
                name: name,
                string: testString,
                answer: answerType,
                components: partList,
                guessList: guessList
            };
        }
    };


    return {makeTest, chooseCode, getPoints, getRandomFrom};
});

