define(
["utils", "testCode", "components", "expressions"],
function(utils, testCode, components, expressions) {
    return [
        {
            prototypeString: "var x;",
            components: [
                {
                    name: "test",
                    component: components.test,
                    history: [{valid: true,time: 4000},],
                    score: null,
                    level: 0,
                },
                {
                    name: "semicolon",
                    component: components.semicolon,
                    history: [
                        {
                            valid: true,
                            time: 4000 //ms
                        },
                    ],
                    score: null,
                    level: 0,
                },
            ],
            history: [],
            level: 0
        },
        {
            prototypeString: "var x;<br>x = 1;",
            components: [
                {
                    name: "variable",
                    component: components.variable,
                    history: [
                        {
                            valid: true,
                            time: 4000 //ms
                        },
                    ],
                    score: null,
                    level: 0,
                },{
                    name: "space",
                    component: components.space,
                    history: [
                        {
                            valid: true,
                            time: 4000 //ms
                        },
                    ],
                    score: null,
                    level: 0,
                },{
                    name: "identifier",
                    component: components.identifier,
                    history: [
                        {
                            valid: true,
                            time: 4000 //ms
                        },
                    ],
                    score: null,
                    level: 1,
                },
                {
                    name: "semicolon",
                    component: components.semicolon,
                    history: [
                        {
                            valid: true,
                            time: 4000 //ms
                        },
                    ],
                    score: null,
                    level: 50,
                },
                {
                    name: "identifier",
                    component: components.identifier,
                    history: [
                        {
                            valid: true,
                            time: 4000 //ms
                        },
                    ],
                    score: null,
                    level: 1,
                },
                {
                    name: "space",
                    component: components.space,
                    history: [
                        {
                            valid: true,
                            time: 4000 //ms
                        },
                    ],
                    score: null,
                    level: 0,
                },
                {
                    name: "assignment",
                    component: components.assignment,
                    history: [
                        {
                            valid: true,
                            time: 4000 //ms
                        },
                    ],
                    score: null,
                    level: 50,
                },
                {
                    name: "space",
                    component: components.space,
                    history: [
                        {
                            valid: true,
                            time: 4000 //ms
                        },
                    ],
                    score: null,
                    level: 0,
                },
                {
                    name: "number",
                    component: components.number,
                    history: [
                        {
                            valid: true,
                            time: 4000 //ms
                        },
                    ],
                    score: null,
                    level: 50,
                },
                {
                    name: "semicolon",
                    component: components.semicolon,
                    history: [
                        {
                            valid: true,
                            time: 4000 //ms
                        },
                    ],
                    score: null,
                    level: 50,
                },
            ],
            history: [],
            level: 0
        },
        {
            prototypeString: "var x = {};",
            components: [
                {
                    name: "variable",
                    component: components.variable,
                    history: [
                        {
                            valid: true,
                            time: 4000 //ms
                        },
                    ],
                    score: null,
                    level: 0,
                },
                {
                    name: "identifier",
                    component: components.identifier,
                    history: [
                        {
                            valid: true,
                            time: 4000 //ms
                        },
                    ],
                    score: null,
                    level: 0,
                },
                {
                    name: "assignment",
                    component: components.assignment,
                    history: [
                        {
                            valid: true,
                            time: 4000 //ms
                        },
                    ],
                    score: null,
                    level: 0,
                },
                {
                    name: "object",
                    component: components.object,
                    history: [
                        {
                            valid: true,
                            time: 4000 //ms
                        },
                    ],
                    score: null,
                    level: 0,
                },
                {
                    name: "semicolon",
                    component: components.semicolon,
                    history: [
                        {
                            valid: true,
                            time: 4000 //ms
                        },
                    ],
                    score: null,
                    level: 0,
                },
            ],
            history: [],
            level: 0
        }
    ];
});