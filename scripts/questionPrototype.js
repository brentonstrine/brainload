define([], function() {
  return {
      questionPrototype: function(){
          var score = 100;
          //var levelPoints = 0;
          var history = [];
          var specialPart = null;

          this.updateScore = function(amount){
              score += amount;
              if(score < 1) {
                  score = 1;
              }
          };
          this.setScore = function(newScore){
              score = newScore;
          };
          this.getScore = function(){
              return score;
          };
          this.addToHistory= function(item){
              history.push(item);
          };
          this.setSpecialPart = function(part){
              specialPart = this.get(true).string;
          };
          this.passSpecialPart = function(part, type){
              specialPart = part;
              // type
          };
          this.getSpecialPart = function(){
              if (specialPart === undefined || specialPart === null) {
                  return false;
              } else {
                  return specialPart;
              }
          };
          this.clearSpecialPart = function(){
              specialPart = null;
          };
          return {
              history: history,
              updateScore: this.updateScore,
              setScore: this.setScore,
              getScore: this.getScore,
              addToHistory: this.addToHistory,
              setSpecialPart: this.setSpecialPart,
              passSpecialPart: this.passSpecialPart,
              getSpecialPart: this.getSpecialPart,
              clearSpecialPart: this.clearSpecialPart,
          };
      }
  }
});

