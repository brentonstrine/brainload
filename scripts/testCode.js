define([], function() {
  return {
      testCodePrototype: (function(){
          var score = 0;
          var history = [];
          this.updateScore= function(amount){
              score += amount;
          };
          this.getScore = function(){
              return score;
          };
          this.addToHistory= function(item){
              history.push(item);
          };
          this.get = function(type){
              return "No component specified.";
          }
          return {get, updateScore, getScore};
      }())
  }
});

