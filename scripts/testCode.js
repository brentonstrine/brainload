define([], function() {
  return {
      testCodePrototype: (function(){
          var score = 0;
          this.updateScore= function(amount){
              score += amount;
          };
          this.getScore = function(){
              return score;
          };
          this.get = function(type){
              return "No component specified.";
          }
          return {get, updateScore, getScore};
      }())
  }
});

