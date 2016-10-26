define([], function() {
  return {
      testCodePrototype: function(){
          var score = 100;
          var history = [];
          var specialPart = null;

          this.updateScore = function(amount){
              score += amount;
          };
          this.getScore = function(){
              return score;
          };
          this.addToHistory= function(item){
              history.push(item);
          };
          this.setSpecialPart = function(part){
              specialPart = this.get(true);
          };
          this.passPart = function(part, type){
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
              updateScore: this.updateScore,
              getScore: this.getScore,
              addToHistory: this.addToHistory,
              setSpecialPart: this.setSpecialPart,
              passPart: this.passPart,
              getSpecialPart: this.getSpecialPart,
              clearSpecialPart: this.clearSpecialPart,
          };
      }
  }
});

