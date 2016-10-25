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
          return {
              updateScore,
              getScore,
              addToHistory,
              
          };
      }())
  }
});

