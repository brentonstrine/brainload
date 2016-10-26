define(["utils", "testCode"], function(utils, testCode) {
    var test = Object.create(testCode.testCodePrototype(), {
        get: {value: function(type){
            var fragment;
            if(type==true){
                fragment = "test";
            } else {
                fragment = utils.pickFromArr(["vest", "chest", "breast", "nest"]);
            }
            fragment += "<span class='component-explanation component-explanation-meta'>test</span>";
            return fragment;
        }}
    });

    var variable = Object.create(testCode.testCodePrototype(), {

        score: {value: 0},
        history: {value: []},
        get: {value: function(type){
            var fragment = '<span class="component ';
            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
                fragment += "var";
                fragment += '</span>';
            } else {
                fragment += 'component-error"><span class="component-code">';
                fragment += utils.pickFromArr(["VAR", "Variable", "Var", "vaR", "variable", "x", utils.pickFrom(0,999), "myVar"]);
                fragment += '</span>';
            }
            fragment += "<span class='component-explanation'>var keyword</span></span>\n";
            return fragment;
        }},
    });
    var space = Object.create(testCode.testCodePrototype(), {

        score: {value: 0},
        history: {value: []},
        get: {value: function(type){
            var fragment = '<span class="component ';
            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
                fragment += "&nbsp;";
                fragment += '</span>';
            } else {
                fragment += 'component-error"><span class="component-code">';
                fragment += utils.pickFromArr(["<span class='component-missing component-required'>&nbsp;</span>", utils.pickFromArr(["]", "*", "|", "'", "=", "."])]);
                fragment += '</span>';
            }
            fragment += "<span class='component-explanation'>space</span></span>\n";
            return fragment;
        }}
    });
    var identifier = Object.create(testCode.testCodePrototype(), {

        score: {value: 0},
        history: {value: []},
        get: {value: function(type){
            var fragment = '<span class="component ';
            var part = this.getSpecialPart();

            if(part){
                fragment = part;
            } else if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
                fragment += utils.pickFromArr(["x", "y", "z", "myVarName", "monkey", "A", "B", "C"]);
                fragment += '</span>';
            } else {
                fragment += 'component-error"><span class="component-code">';
                fragment += utils.pickFromArr(["<span class='component-missing'>&nbsp;</span>" + utils.pickFrom(0,999), "<span class='component-missing'>&nbsp;</span>", "<span class='component-missing'>&nbsp;</span>", ";", "=", "-", utils.pickFrom(0,999), "5"]);
                fragment += '</span>';
            }
            fragment += "<span class='component-explanation'>identifier</span></span>\n";
            return fragment;
        }}
    });
    var assignment  = Object.create(testCode.testCodePrototype(), {

        score: {value: 0},
        history: {value: []},
        get: {value: function(type){
            var fragment = '<span class="component ';
            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
                fragment += "=";
                fragment += '</span>';
            } else {
                fragment += 'component-error"><span class="component-code">';
                fragment += utils.pickFromArr("==", "===", "<span class='component-missing'>&nbsp;</span>", "utils.pickFrom(0,999)", "-", "!");
                fragment += '</span>';
            }
            fragment += "<span class='component-explanation'>assignment</span></span>\n";
            return fragment;
        }}
    });
    var object  = Object.create(testCode.testCodePrototype(), {

        score: {value: 0},
        history: {value: []},
        get: {value: function(type){
            var fragment = '<span class="component ';
            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
                fragment += "{}";
                fragment += '</span>';
            } else {
                fragment += 'component-error"><span class="component-code">';
                fragment += utils.pickFromArr("{", "}", "}{", "<span class='component-missing'>&nbsp;</span>", "{]", "[}", "<>");
                fragment += '</span>';
            }
            fragment += "<span class='component-explanation'>object</span></span>\n";
            return fragment;
        }}
    });
    var number  = Object.create(testCode.testCodePrototype(), {

        score: {value: 0},
        history: {value: []},
        get: {value: function(type){
            var fragment = '<span class="component ';
            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
                fragment += utils.pickFrom(0,999);
                fragment += '</span>';
            } else {
                fragment += 'component-error"><span class="component-code">';
                fragment += utils.pickFromArr(["<span class='component-missing'>&nbsp;</span>", "=", "&", "+", ", ", "; ", "var"]);
                fragment += '</span>';
            }
            fragment += "<span class='component-explanation'>number</span></span>\n";
            return fragment;
        }}
    });
    var semicolon  = Object.create(testCode.testCodePrototype(), {
        score: {value: 0},
        history: {value: []},
        get: {value: function(type){
            var fragment = '<span class="component ';
            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
                fragment += ";<br>";
                fragment += '</span>';
            } else {
                fragment += 'component-error"><span class="component-code">';
                fragment += utils.pickFromArr(["<span class='component-missing'>&nbsp;</span>", ": ", ". ", ", ", "<span class='component-missing'>&nbsp;</span>"]);
                fragment += '</span>';
            }
            fragment += "<span class='component-explanation'>semicolon</span></span>\n";
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