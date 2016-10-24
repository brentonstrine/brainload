define(["utils", "testCode"], function(utils, testCode) {
    var test = Object.create(testCode.testCodePrototype, {
        get: {value: function(type){
            var fragment;
            if(type==true){
                fragment = "test";
            } else {
                fragment = utils.pickFromArr(["vest", "chest", "breast", "nest"]);
            }
            fragment += "<span class='js-syntax-explanation js-syntax-explanation-meta'>test</span>";
            return fragment;
        }}
    });

    var variable = Object.create(testCode.testCodePrototype, {
        get: {value: function(type){
            var fragment;
            if(type==true){
                fragment = "var";
            } else {
                fragment = utils.pickFromArr(["VAR", "Variable", "Var", "vaR", "variable", "x", utils.pickFrom(0,999), "myVar"]);
            }
            fragment += "<span class='js-syntax-explanation js-syntax-explanation-meta'>variable declaration</span>";
            return fragment;
        }}
    });
    var space = Object.create(testCode.testCodePrototype, {
        get: {value: function(type){
            var fragment;
            if(type==true){
                fragment = "&nbsp;";
            } else {
                fragment = utils.pickFromArr(["<span> </span>", utils.pickFromArr(["-", "*", "$", "'", "=", "."])]);
            }
            fragment += "<span class='js-syntax-explanation'>space</span>";
            return fragment;
        }}
    });
    var identifier = Object.create(testCode.testCodePrototype, {
        get: {value: function(type){
            var fragment;

            if(type==true){
                fragment = utils.pickFromArr(["x", "y", "z", "myVarName", "monkey", "A", "B", "C"]);
            } else {
                fragment = utils.pickFromArr(["<span> </span>" + utils.pickFrom(0,999), "<span> </span>x", "<span> _ </span>", ";", "=", "-", utils.pickFrom(0,999), "<br>x"]);
            }
            fragment += "<span class='js-syntax-explanation'>identifier</span>";
            return fragment;
        }}
    });
    var assignment  = Object.create(testCode.testCodePrototype, {
        get: {value: function(type){
            var fragment;
            if(type==true){
                fragment = "=";
            } else {
                fragment = utils.pickFromArr("==", "===", "<span> _ </span>", "utils.pickFrom(0,999)", "-", "!");
            }
            fragment += "<span class='js-syntax-explanation'>assignment</span>";
            return fragment;
        }}
    });
    var object  = Object.create(testCode.testCodePrototype, {
        get: {value: function(type){
            var fragment;
            if(type==true){
                fragment = "{}";
            } else {
                fragment = utils.pickFromArr("{", "}", "}{", "<span> _ </span>", "{]", "[}", "<>");
            }
            fragment += "<span class='js-syntax-explanation'>object</span>";
            return fragment;
        }}
    });
    var number  = Object.create(testCode.testCodePrototype, {
        get: {value: function(type){
            var fragment;
            if(type==true){
                fragment = utils.pickFrom(0,999);
            } else {
                fragment = utils.pickFromArr(["<span> _ </span>", "=", "&", "+", ", ", "; ", "var"]);
            }
            fragment += "<span class='js-syntax-explanation'>number</span>";
            return fragment;
        }}
    });
    var semicolon  = Object.create(testCode.testCodePrototype, {
        get: {value: function(type){
            var fragment;
            if(type==true){
                fragment = ";<br>";
            } else {
                fragment = utils.pickFromArr(["<span>_</span>", ": ", ". ", ", ", "<span>_</span>"]);
            }
            fragment += "<span class='js-syntax-explanation'>semicolon</span>";
            return fragment;
        }}
    });

    return {
        variable,
        identifier,
        assignment,
        number,
        semicolon,
        space,
        test,
    };
});