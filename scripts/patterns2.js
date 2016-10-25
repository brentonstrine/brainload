define(["testCode", "components", "expressions"], function(testCode, components, expressions) {
    return [
        Object.create(testCode.testCodePrototype, {
            get: {value: function(type){
                // var x;
                var fragment;
                fragment += components.variable.get();
                fragment += components.space.get();
                fragment += components.identifier.get();
                fragment += components.semicolon.get();



                if(type==true){
                    fragment = "var";
                } else {
                    fragment = utils.pickFromArr(["VAR", "Variable", "Var", "vaR", "variable", "x", utils.pickFrom(0,999), "myVar"]);
                }
                fragment += "<span class='js-syntax-explanation js-syntax-explanation-meta'>variable declaration</span>";
                return fragment;
            }}
        });
    ];
});

