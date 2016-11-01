define(["utils", "questionPrototype"], function(utils, questionPrototype) {
    var variable = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component Variable";
            var fragment  = '<span class="component component-variable ';
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
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }},
    });
    var space = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component Space";
            var fragment  = '<span class="component component-space ';
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
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }}
    });
    var identifier = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component Identifier";
            var fragment = "";
            var part = this.getSpecialPart();

            if(part && type == true){
                fragment = part;
            } else if(type==true){
                fragment += '<span class="component component-identifier ';
                fragment += 'component-ok"><span class="component-code">';
                fragment += utils.pickFromArr(["x", "y", "z", "myVarName", "monkey", "A", "B", "C", "Identifier", "identifier", "name"]);
                fragment += '</span>';
                fragment += "<span class='component-explanation'>identifier</span></span>\n";
            } else {
                fragment += '<span class="component ';
                fragment += 'component-error"><span class="component-code">';
                fragment += utils.pickFromArr([utils.pickFrom(0,999), "<span class='component-missing'>x</span>", ";", "=", "-", utils.pickFrom(0,999), utils.pickFromArr(['"x"', '"y"', '"z"', '"myVarName"', '"monkey"', '"A"', '"B"', '"C"', '"string"'])]);
                fragment += '</span>';
                fragment += "<span class='component-explanation'>identifier</span></span>\n";
            }
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }}
    });
    var assignment  = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component Assignment";
            var fragment  = '<span class="component B component-assignment ';
            if(type==true){
                fragment += 'component-ok   Ba"><span class="component-code">';
                fragment += "=";
                fragment += '</span>';
            } else {
                fragment += 'component-error Bb"><span class="component-code">';
                var a = utils.pickFromArr(["==", "===", "<span class='component-missing'>&nbsp;</span>", utils.pickFrom(0,999), "-", "!"]);
                fragment += a;
                fragment += '</span>';
                if(a=="="){debugger;}
            }
            fragment += "<span class='component-explanation'>assignment</span></span>\n";
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }}
    });
    var object  = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component Object";
            var fragment  = '<span class="component component-object ';
            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
                fragment += "{}";
                fragment += '</span>';
            } else {
                fragment += 'component-error"><span class="component-code">';
                fragment += utils.pickFromArr(["{", "}", "}{", "<span class='component-missing'>&nbsp;</span>", "{]", "[}", "<>"]);
                fragment += '</span>';
            }
            fragment += "<span class='component-explanation'>object</span></span>\n";
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }}
    });
    var number  = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component Number";
            var fragment  = '<span class="component component-number ';
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
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }}
    });

    var string = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component String";
            var fragment  = '<span class="component component-string ';

            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
                fragment += utils.pickFromArr(['"x"', '"y"', '"z"', '"myVarName"', '"monkey"', '"A"', '"B"', '"C"', '"string"', '"value"']);
                fragment += '</span>';
            } else {
                fragment += 'component-error"><span class="component-code">';
                fragment += utils.pickFromArr(["<span class='component-missing'>&nbsp;</span>", "<span class='component-missing'>&nbsp;</span>", "<span class='component-missing'>&nbsp;</span>", ";", "=", "-", utils.pickFrom(0,999), utils.pickFromArr(["x", "y", "z", "myVarName", "monkey", "A", "B", "C", "identifier", "name"]) ]);
                fragment += '</span>';
            }
            fragment += "<span class='component-explanation'>string</span></span>\n";
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }}
    });

    var semicolon  = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component Semicolon";
            var fragment  = '<span class="component component-semicolon ';
            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
                fragment += ';';
                fragment += '</span>';
            } else {
                fragment += 'component-error"><span class="component-code">';
                fragment += utils.pickFromArr(["<span class='component-missing'>&nbsp;</span>", ": ", ". ", ", ", "<span class='component-missing'>&nbsp;</span>"]);
                fragment += '</span>';
            }
            fragment += "<span class='component-explanation'>semicolon</span></span>\n";
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }}
    });

    var value = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component Value";
            var fragment  = '<span class="component component-value ';
            var value;
            score = this.getScore();
            if(score < 120){
                value = utils.pickFromArr([simpleNumber(type)]);
            } else if (score < 140) {
                value = utils.pickFromArr([simpleNumber(type), simpleString(type)]);
            } else if (score < 160) {
                value = utils.pickFromArr([simpleNumber(type), simpleString(type), simpleObject(type)]);
            } else {
                value = utils.pickFromArr([simpleNumber(type), simpleString(type), simpleObject(type), simpleIdentifier(type)]);
            }
            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
                fragment += value;
            } else {
                fragment += 'component-error"><span class="component-code">';
                fragment += value;
            }
            fragment += '</span>';
            fragment += "<span class='component-explanation'>value</span></span>\n";
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }}
    });

    var operator = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component Operator";
            var fragment  = '<span class="component component-operator';
            var value;
            score = this.getScore();
            if(score < 120){
                value = utils.pickFromArr([plus(type)]);
            } else if (score < 140) {
                value = utils.pickFromArr([plus(type), minus(type)]);
            } else if (score < 160) {
                value = utils.pickFromArr([plus(type), minus(type), times(type)]);
            } else {
                value = utils.pickFromArr([plus(type), minus(type), times(type), divide(type)]);
            }

            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
                fragment += value;
            } else {
                fragment += 'component-error"><span class="component-code">';
                fragment += value;
            }
            fragment += '</span>';
            fragment += "<span class='component-explanation'>operator</span></span>\n";
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }}
    });
    var badValue  = function(){
            return utils.pickFromArr(["<span class='component-missing'>&nbsp;</span>", "=", "&", "+", ", ", "; ", "var","{", "}", "}{", "{]", "[}", "<>"]);
    };
    var goodValue  = function(){
            return utils.pickFromArr([simpleNumber(true), simpleString(true), simpleObject(true), simpleIdentifier(true)]);
    };

    // simple value types
    var simpleNumber  = function(type){
        if(type==true){
            return utils.pickFrom(0,999);
        } else {
            return badValue();
        }
    };
    var simpleString  = function(type){
        if(type==true){
            return utils.pickFromArr(['"x"', '"y"', '"z"', '"myVarName"', '"monkey"', '"A"', '"B"', '"C"', '"string"', '"value"']);
        } else {
            return badValue();
        }
    };
    var simpleObject  = function(type){
        if(type==true){
            return "{}";
        } else {
            return badValue();
        }
    };
    var simpleIdentifier  = function(type){
        if(type==true){
            return utils.pickFromArr(["x", "y", "z", "myVarName", "monkey", "A", "B", "C", "Identifier", "identifier", "name"]);
        } else {
            return badValue();
        }
    };


    var badOperator  = function(){
            return utils.pickFromArr(["<span class='component-missing'>&nbsp;</span>", "=", ";", "var", "<>", goodValue()]);
    };
    //operators
    var plus  = function(type){
        if(type==true){
            return "+";
        } else {
            return badOperator();
        }
    };
    var minus = function(type){
        if(type==true){
            return "-";
        } else {
            return badOperator();
        }
    };
    var times = function(type){
        if(type==true){
            return "*";
        } else {
            return badOperator();
        }
    };
    var divide = function(type){
        if(type==true){
            return "/";
        } else {
            return badOperator();
        }
    };

    return {
        variable,
        identifier,
        assignment,
        number,
        semicolon,
        space,
        string,
        value,
        operator,
    };
});