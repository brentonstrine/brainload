define(["utils", "questionPrototype"], function(utils, questionPrototype) {
    var variable = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component-Variable";
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

    var lastTagName = {};
    var tagName = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Tag-Name";
            lastTagName.value = getTagName(type);
            lastTagName.type = type;
            ;
            var fragment  = '<span class="component component-tagName ';
            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
            } else {
                fragment += 'component-error"><span class="component-code">';
            }
            fragment += lastTagName.value;
            fragment += '</span>';

            fragment += "<span class='component-explanation'>Tag Name</span></span>\n";
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }},
    });

    var tagNameSame = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Tag-Name";
            var fragment  = '<span class="component component-tagName ';
            var errDetail = "";
            if(type==true){
                if(lastTagName.type == true) {
                    fragment += 'component-ok   "><span class="component-code">';
                } else {
                    fragment += 'component-error"><span class="component-code">';
                }
                fragment += lastTagName.value;
            } else {
                var mismatchTagName = getTagName(true);
                errDetail = " does not match";
                if(mismatchTagName==lastTagName.value) {
                    mismatchTagName = getTagName(false);
                }
                fragment += 'component-error"><span class="component-code">';
                fragment += mismatchTagName;
            }
            fragment += '</span>';

            fragment += "<span class='component-explanation'>tag name" + errDetail + "</span></span>\n";
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }},
    });

    var elementContent = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Element-Content";
            var fragment  = '<span class="component component-content ';
            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
            } else {
                fragment += 'component-error"><span class="component-code">';
            }
            fragment += getContent(type);
            fragment += '</span>';

            fragment += "<span class='component-explanation'>element content</span></span>\n";
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }},
    });

    var attribute = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Element-Attribute";
            var fragment  = '<span class="component component-attribute ';
            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
            } else {
                fragment += 'component-error"><span class="component-code">';
            }
            fragment += getAttribute(type);
            fragment += '</span>';

            fragment += "<span class='component-explanation'>element attribute</span></span>\n";
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }},
    });
    var space = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component-Space";
            var fragment  = '<span class="component component-space ';
            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
                fragment += "&nbsp;";
            } else {
                fragment += 'component-error"><span class="component-code">';
                fragment += utils.pickFromArr(["<span class='component-missing component-required'>&nbsp;</span>", utils.pickFromArr(["]", "*", "|", "'", "=", "."])]);
            }
            fragment += '</span>';
            fragment += "<span class='component-explanation'>space</span></span>\n";
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }}
    });
    var indent = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component-Space";
            var fragment  = '<span class="component component-indent ';
            if(type==true){
                fragment += 'component-ok"><span class="component-code">';
                fragment += "&nbsp;&nbsp;&nbsp;&nbsp;";
            } else {
                fragment += 'component-error"><span class="component-code">';
                fragment += utils.pickFromArr(["<span class='component-missing component-required'>&nbsp;&nbsp;&nbsp;&nbsp;</span>"]);
            }
            fragment += '</span>';
            fragment += "<span class='component-explanation'>indentation</span></span>\n";
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }}
    });
    var identifier = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component-Identifier";
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

    var identifierUnique = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component-Identifier";
            var fragment = "";
            var value = simpleIdentifierAlt(type);

            fragment += '<span class="component component-identifier ';

            if(type==true){
                fragment += 'component-ok">';
            } else {
                fragment += 'component-error">';
            }
            fragment += '<span class="component-code">';
            fragment += value;
            fragment += '</span>';
            fragment += "<span class='component-explanation'>identifier</span>";
            fragment += "</span>\n";
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }}
    });
    var assignment  = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component-Assignment";
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
                if(a=="="){
                  ;debugger;
                }
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
            var name = "Component-Object";
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

        var openAngle  = Object.create(questionPrototype.questionPrototype(), {
            get: {value: function(type){
                var name = "Component-Open Angle Bracket";
                var fragment  = '<span class="component component-openAngle ';
                if(type==true){
                    fragment += 'component-ok   "><span class="component-code">';
                    fragment += "&lt;";
                    fragment += '</span>';
                } else {
                    fragment += 'component-error"><span class="component-code">';
                    fragment += utils.pickFromArr(["&gt;", "{", "<span class='component-missing'>&nbsp;</span>", "[", "|", "<>", "&gt;&gt;", "-", "[", "="]);
                    fragment += '</span>';
                }
                fragment += "<span class='component-explanation'>open angle bracket</span></span>\n";
                return {
                    name: name,
                    string: fragment,
                    answer: type,
                };
            }}
        });


        var closeAngle  = Object.create(questionPrototype.questionPrototype(), {
            get: {value: function(type){
                var name = "Component-Close Angle Brace";
                var fragment  = '<span class="component component-closeAngle ';
                if(type==true){
                    fragment += 'component-ok   "><span class="component-code">';
                    fragment += "&gt;";
                    fragment += '</span>';
                } else {
                    fragment += 'component-error"><span class="component-code">';
                    fragment += utils.pickFromArr(["&lt;", "}", "<span class='component-missing'>&nbsp;</span>", "]", "=&gt;", "&gt;&gt;", ".", ":", "[", "="]);
                    fragment += '</span>';
                }
                fragment += "<span class='component-explanation'>close Angle bracket</span></span>\n";
                return {
                    name: name,
                    string: fragment,
                    answer: type,
                };
            }}
        });
    var openCurly  = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component-Open Curly Brace";
            var fragment  = '<span class="component component-openCurly ';
            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
                fragment += "{";
                fragment += '</span>';
            } else {
                fragment += 'component-error"><span class="component-code">';
                fragment += utils.pickFromArr(["}", "}{", "<span class='component-missing'>&nbsp;</span>", "{]", "[}", "<>", "{;", ":", "[", "="]);
                fragment += '</span>';
            }
            fragment += "<span class='component-explanation'>open curly bracket</span></span>\n";
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }}
    });


    var closeCurly  = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component-Close Curly Brace";
            var fragment  = '<span class="component component-closeCurly ';
            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
                fragment += "}";
                fragment += '</span>';
            } else {
                fragment += 'component-error"><span class="component-code">';
                fragment += utils.pickFromArr(["{", "}{", "<span class='component-missing'>&nbsp;</span>", "{]", "[}", "<>", "{;", ":", "[", "="]);
                fragment += '</span>';
            }
            fragment += "<span class='component-explanation'>close curly brace</span></span>\n";
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }}
    });

    var number  = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component-Number";
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
            var name = "Component-String";
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

    var forwardSlash  = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component-Forward-Slash";
            var fragment  = '<span class="component component-forwardSlash ';
            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
                fragment += '/';
                fragment += '</span>';
            } else {
                fragment += 'component-error"><span class="component-code">';
                fragment += utils.pickFromArr(["<span class='component-missing'>&nbsp;</span>", ":", ".", ",", "\\", "|", "//", "<span class='component-missing'>&nbsp;</span>"]);
                fragment += '</span>';
            }
            fragment += "<span class='component-explanation'>forward slash</span></span>\n";
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }}
    });
    var semicolon  = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component-Semicolon";
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
    var colon  = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component-Colon";
            var fragment  = '<span class="component component-colon ';
            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
                fragment += ':';
                fragment += '</span>';
            } else {
                fragment += 'component-error"><span class="component-code">';
                fragment += utils.pickFromArr(["<span class='component-missing'>&nbsp;</span>", "=", ";", ",", "-"]);
                fragment += '</span>';
            }
            fragment += "<span class='component-explanation'>colon</span></span>\n";
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }}
    });

    var comma  = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component-Comma";
            var fragment  = '<span class="component component-comma ';
            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
                fragment += ',';
                fragment += '</span>';
            } else {
                fragment += 'component-error"><span class="component-code">';
                fragment += utils.pickFromArr(["<span class='component-missing'>&nbsp;</span>", ".", ";", ":"]);
                fragment += '</span>';
            }
            fragment += "<span class='component-explanation'>comma</span></span>\n";
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }}
    });
    var value = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component-Value";
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
            var name = "Component-Operator";
            var fragment  = '<span class="component component-operator ';
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
                fragment += 'component-ok"><span class="component-code">';
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

    var iff  = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component-Begin If";
            var fragment  = '<span class="component component-beginIf ';
            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
                fragment += utils.pickFromArr([
                    "if(true){",
                    "if(false){",
                    "if(1<500){",
                    "if(1>30){",
                    "if(4==4){",
                    "if(88==88){",
                    "if(67==90){",
                    "if(x==true){",
                    "if(x==false){",
                    "if(x==y){",
                ]);
                fragment += '</span>';
            } else {
                fragment += 'component-error hasSubError"><span class="component-code">';
                fragment += utils.pickFromArr([
                    "if<span class='component-error'>)</span>true<span class='component-error'>(</span>{",
                    "if<span class='component-error'>{</span>true<span class='component-error'>}</span>{",
                    "if<span class='component-missing'>(true)</span>{",
                    "if<span class='component-error'>[</span>true<span class='component-error'>]</span>{",
                    "if<span class='component-error'>:</span> ",
                    "if(true)<span class='component-missing'>{</span>",
                    "if<span class='component-error'>: false (</span>",
                    "if<span class='component-missing'>(</span>x===500<span class='component-missing'>){</span>",
                    "if(x=<span class='component-missing'>=</span>true){",
                    "if(x=<span class='component-missing'>=</span>false){",
                    "if(x=<span class='component-missing'>=</span>50){",
                    "if<span class='component-error'>&lt;<span>33===33<span class='component-error'>&gt;</span>{",
                    "if(3=<span class='component-missing'>=</span>5){",
                    "<span class='component-error'>(</span>if false){",
                    'if <span class="component-error">"</span>8>4<span class="component-error">"</span> {',
                ]);
                fragment += '</span>';
            }
            fragment += "<span class='component-explanation'>if statement</span></span>\n";
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }}
    });


    var functionStart  = Object.create(questionPrototype.questionPrototype(), {
        get: {value: function(type){
            var name = "Component-Function";
            var fragment  = '<span class="component component-beginIf ';
            if(type==true){
                fragment += 'component-ok   "><span class="component-code">';
                fragment += "function(){";
                fragment += '</span>';
            } else {
                fragment += 'component-error hasSubError"><span class="component-code">';
                fragment += utils.pickFromArr([
                    "function<span class='component-error'>)(</span>{",
                    "function<span class='component-error'>{}</span>{",
                    "function<span class='component-missing'>()</span>{",
                    "function<span class='component-error'>[]</span>{",
                    "function<span class='component-error'>:</span>",
                    "function()<span class='component-missing'>{</span>",
                    "function()<span class='component-error'>:</span>",
                    "function(<span class='component-error'>45>2</span>){",
                    "function(<span class='component-error'>x===false</span>){",
                    "function<span class='component-error'>&lt;&gt;</span>{",
                    "function(<span class='component-missing'>)</span>5{",
                    "<span class='component-error'>(</span>function<span class='component-missing'>(</span>){",
                ]);
                fragment += '</span>';
            }
            fragment += "<span class='component-explanation'>if statement</span></span>\n";
            return {
                name: name,
                string: fragment,
                answer: type,
            };
        }}
    });

    //SIMPLE HELPER FUNCTIONS

    //values
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

    // tags
    var getTagName  = function(type){
        if(type==true){
            return utils.pickFromArr(['b', 'div', 'p', 'h1', 'span', 'div', 'div', 'h2', 'a', 'div']);
        } else {
            return badTag();
        }
    };
    var badTag  = function(){
            return utils.pickFromArr(["<span class='component-missing'>&nbsp;</span>", "=", "&gt;", "&lt;", "p!", "div=", "var",".", "!", "super:duper", "&gt;div", "&lt;div", "&gt;&lt;&gt;div"]);
    };

    // content
    var getContent  = function(type){
        if(type==true){
            return utils.pickFromArr(["Hello", "Hello!", "Hi", "hi world", "hey", "&apos;Sup?", "Hi"]);
        } else {
            return utils.pickFromArr(["&gt;", "&lt;",]);
        }
    };

    // attribute
    var getAttribute  = function(type){
        var atrN = "<span class='component-attributeName'>";
        var atrV = "<span class='component-attributeValue'>";
        var atrE = "<span class='component-attributeEquals'>";
        var sSpan = "</span>";

        var attrValue = "";
        var attrName = "";
        if(lastTagName === "a") {
            attrValue = utils.pickFromArr(['http://google.com', 'http://shoutleaf.com', 'http://github.com', 'http://gmail.com',]);
            attrName = "&nbsp;href";
        } else if(type==true){
            attrValue = utils.pickFromArr(["red", "blue", "large", "small", "bordered", "small red",]);
            attrName = "&nbsp;class";
        } else {
            val = utils.pickFromArr(["red", "blue", "large", "small", "bordered", "small red",]);
            attrValue = utils.pickFromArr(
                [
                    atrV + "&quot;&quot;"+val+"&quot;&quot;" + sSpan,
                    atrV + "{"+val+"}" + sSpan,
                    atrV + "["+val+"]" + sSpan,
                    atrV + "("+val+")" + sSpan,
                    atrV + "(&quot;"+val+"&quot;)" + sSpan,
                ]
            );
            fullAttr = utils.pickFromArr(
                [
                    // bad quotes, e.g. class(red)
                    atrN + "&nbsp;class" + sSpan
                    + atrE + "=" + sSpan
                    + atrV + attrValue + sSpan,
                    // missing =
                    atrN + "&nbsp;class" + sSpan
                    + atrE + "<span class='component-missing'>&nbsp;</span>" + sSpan
                    + atrV + "&quot;"+val+"&quot;" + sSpan,
                    // doubled ==
                    atrN + "&nbsp;class" + sSpan
                    + atrE + "==" + sSpan
                    + atrV + "&quot;"+val+"&quot;" + sSpan,
                    // missing space prefix
                    atrN + "<span class='component-missing'>&nbsp;</span>class" + sSpan
                    + atrE + "=" + sSpan
                    + atrV + "&quot;" + val + "&quot;" + sSpan,
                ]
            );
            console.log(fullAttr);
            return fullAttr;
        }
        var fullAttr = atrN + attrName + sSpan + atrE + "=" + sSpan + atrV + "&quot;" + attrValue + "&quot;" + sSpan;
        console.log(fullAttr);
        return fullAttr;
    };

    //identifiers and keys
    var badIdentifier  = function(){
            return utils.pickFromArr(['"' + simpleIdentifier(true) + '""', simpleNumber(true), badValue(), simpleObject(), goodOperator()]);
    };
    var simpleIdentifier  = function(type){
        if(type==true){
            return utils.pickFromArr(["x", "y", "z", "myVarName", "monkey", "A", "B", "C", "Identifier", "identifier", "name"]);
        } else {
            return badIdentifier();
        }
    };
    var simpleIdentifierAlt  = function(type){
        if(type==true){
            return utils.pickFromArr(["q", "r", "s", "chimp", "kimp", "K", "key", "k", "myName"]);
        } else {
            return badIdentifier();
        }
    };


    //operators
    var goodOperator  = function(){
            return utils.pickFromArr([plus(true), minus(true), times(true), divide(true)]);
    };
    var badOperator  = function(){
            return utils.pickFromArr(["<span class='component-missing'>&nbsp;</span>", "=", ";", "var", "<>", goodValue()]);
    };
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
        tagName,
        tagNameSame,
        elementContent,
        attribute,
        identifier,
        identifierUnique,
        assignment,
        number,
        openAngle,
        closeAngle,
        openCurly,
        closeCurly,
        forwardSlash,
        semicolon,
        colon,
        comma,
        space,
        indent,
        string,
        value,
        operator,
        iff,
        functionStart,
    };
});