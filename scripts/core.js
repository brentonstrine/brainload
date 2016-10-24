

/*

var myFunction1 = function() {
  var secret1 = 0;
  var secret2 = 0;

  var iterate1 = function(){
  	return secret1++;
  }

  var iterate2 = function(){
  	return secret2++;
  }

  var addSecrets = function(){
  	return secret1 + secret2;
  }
};

var myFunction2 = function() {
  this.secret1 = 0;
  this.secret2 = 0;

  this.iterate1 = function(){
  	return this.secret1++;
  }

  this.iterate2 = function(){
  	return this.secret2++;
  }

  this.addSecrets = function(){
  	return this.secret1 + this.secret2;
  }
};

var myFunction3 = new function() {
  this.secret1 = 0;
  this.secret2 = 0;

  this.iterate1 = function(){
  	return this.secret1++;
  }

  this.iterate2 = function(){
  	return this.secret2++;
  }

  this.addSecrets = function(){
  	return this.secret1 + this.secret2;
  }
};

var myFunction4 = (function() {
  this.secret1 = 0;
  var secret2 = 0;

  var that = this;
  console.log("myfunc4");

  this.iterate1 = function(){
  	return that.secret1++;
  }

  this.iterate2 = function(){
  	return secret2++;
  }

  this.addSecrets = function(){
  	return that.secret1 + secret2;
  }

  return {
      iterate1: this.iterate1,
      iterate2: this.iterate2,
      addSecrets: this.addSecrets,
  }
}());



var myFunction5 = new function() {
  var secret1 = 0;
  var secret2 = 0;
  var that = this;

  this.iterate1 = function(){
    console.log("it1, s1: " + secret1);//works
  	return secret1++;
  }

  this.iterate2 = function(){
  	return secret2++;
  }

  this.addSecrets = function(){
  	return secret1 + secret2;
  }

  this.subs = function() {
    console.log("subs, s1: " + secret1);//fails?
    var subsThis = this;

      this.subF1 = function() {
          console.log("f1");
      }
      var subF2 =  function() {
          console.log("f2");
      }

  }
};

// Function 1
// console.log(myFunction1.secret1); // keeps secret
//console.log(myFunction1.iterate1()); not a function

// Function 2
// console.log(myFunction2.secret1); // keeps secret
//console.log(myFunction2.iterate1()); not a function

// Function 3
 // console.log(myFunction3.secret1); // exposes secret!!
 // console.log(myFunction3.iterate1()); // works

// Function 4
//  console.log(myFunction4.secret1); // keeps secret
// console.log(myFunction4.iterate1()); //not a function
 //console.log(myFunction4().iterate1()); // works, but executes myFunction4() each time. (thus, iteration doesn't happen)


// Function 5
// console.log(myFunction5.secret1); // exposes secret!!
// console.log(myFunction5.iterate1()); // works
// console.log(myFunction5.subs()); // works




var myFunction6 = (function() {
  this.secret1 = 0;
  var secret2 = 0;

  var f6this = this;



  console.group("Main");

  console.log("s1: " + secret1);
  console.log("s2: " + secret2);

  this.iterate1 = function(){
  debugger;
  	return f6this.secret1++;
  }

  this.iterate2 = function(){
  	return secret2++;
  }

  this.addSecrets = function(){
  	return f6this.secret1 + secret2;
  }

  this.subs = function() {
    console.group("Subs")
    console.log("s1: " + secret1);//fails?
    console.log("s2: " + secret2);//fails?
    var subsThis = this;

    //accessable in subs only
      this.subF1 = function() {
          var f1this = this;
          console.group("f1");
            console.log("s1: " + secret1);//fails?
            console.log("s2: " + secret2);//fails?
        console.groupEnd();
          return {secret1, secret2};
      }
      //accessible when returned
      var subF2 =  function() {
          var f2this = this;
          console.group("f2");
            console.log("s1: " + secret1);//fails?
            console.log("s2: " + secret2);//fails?
            console.log(f6this, subsThis, f2this, this);
          console.groupEnd();
          return {secret1, secret2};
      }
      console.groupEnd();
return { subF2, subF1: this.subF1}
  }

  return {
      iterate1: this.iterate1,
      iterate2: this.iterate2,
      addSecrets: this.addSecrets,
      subs: this.subs,
  }
  console.groupEnd();
}());



var f7 = (function() {
  this.secret1 = 0;
  var secret2 = 0;

  this.subs = function() {debugger;}

  return {
      subs: this.subs
  }
}());





var syntax = new function(){
    this.getVar = function(valid, level){
        this.level = 0;
        if(valid){
            return "var";
        } else {
            // return random item chosen from first `level` items of array
        }
    };
    this.aB = function(){
        var a = "A";
    };

};


var varC = new function(){
    this.a = "A";
    this.b = "B";
    this.top = this;
    this.level = null;
    console.log("running varC")

    this.increaseLevel = function(){
        console.log(this.level);
        if(typeof level === "number"){
            level++;
            console.log("increased level")
        } else {
            level = 0;
            console.log("Set level to 0")
        }
        console.log("level", level);
        debugger;
    }
    this.keywords = new function(top){
        this.variable = "variable";
        this.bottom = this;
        debugger;
        this.getMe = function(top, bottom){
            debugger;
        }
    }


};

*/