define(["require", "exports", "StarGenetics/stargeneticsws.soy", "StarGenetics/sg_client_mainframe.soy", "css!StarGenetics/sg_client_mainframe.css", "StarGenetics/state", "StarGenetics/appwidget", "StarGenetics/selectexperiment", "jquery", "jquery-ui"], function(require, exports) {
    var SGUI = require("StarGenetics/stargeneticsws.soy");
    var SGUIMAIN = require("StarGenetics/sg_client_mainframe.soy");

    

    

    var $ = jQuery;

    window.$ = $;
    var GlobalState = require("StarGenetics/state");
    var StarGeneticsGlobalState = new GlobalState.StarGeneticsGlobalState();

    var StarGenetics = (function () {
        function StarGenetics() {
            this.strains = [];
            this.model = {
                "genetics": {
                    "visualizer": { "name": "fly" },
                    "genome": {
                        "chromosomes": {
                            "C_1": {
                                "name": "Chromosome 1",
                                "genes": [
                                    {
                                        "name": "red_eyes",
                                        "position": 25,
                                        "alleles": [
                                            { "name": "A" },
                                            { "name": "a" }
                                        ]
                                    },
                                    {
                                        "name": "wingless",
                                        "position": 40,
                                        "alleles": [
                                            { "name": "B" },
                                            { "name": "b" }
                                        ]
                                    }
                                ]
                            }
                        }
                    },
                    "engine": {
                        "sex_type": "XY",
                        "male_recombination_rate": 1,
                        "female_recombination_rate": 1,
                        "female_sex_ratio": .51,
                        "twinning": 0,
                        "identical_twins_frequency": 0,
                        "avg_offspring_count": 50
                    },
                    "experiments": {},
                    "phenotype_rules": [
                        {
                            "name": "default",
                            "matches": "*",
                            "phenotype": {
                                "wings": 1,
                                "eyes": "red"
                            }
                        },
                        {
                            "name": "white eyes",
                            "matches": "aa",
                            "phenotype": {
                                "eyes": "white"
                            }
                        },
                        {
                            "name": "wingless",
                            "matches": "bb",
                            "phenotype": {
                                "wings": 0
                            }
                        }
                    ],
                    "gel_rules": {},
                    "model_metadata": {},
                    "strains": {
                        "initial": {
                            "name": "Initial Strains",
                            "list": [
                                { "name": "Wildtype M", "sex": "M", "alleles": ["A,A", "B,B"] },
                                { "name": "Wildtype F", "sex": "F", "alleles": ["A,A", "B,B"] },
                                { "name": "Double Mutant M", "sex": "M", "alleles": ["a,a", "b,b"] },
                                { "name": "Double Mutant F", "sex": "F", "alleles": ["a,a", "b,b"] }
                            ]
                        }
                    }
                }
            };
        }
        StarGenetics.prototype.set_message = function (message) {
            $('#' + this.config.element_id).html(message);
        };

        StarGenetics.prototype.configure = function (config) {
            var self = this;
            this.config = config;
            var state = StarGeneticsGlobalState.get_state(config);

            if (config.Widget == 'StudentID') {
                var StudentID = state.setStudentID(config);
                $('#' + StudentID.uid).html("StudentID set.");
            } else if (config.Widget == 'App') {
                state.setApp(config);
                var AppModule = require("StarGenetics/appwidget");
                var AppWidget = new AppModule.StarGeneticsAppWidget(state);
            } else if (config.Widget == 'ClientApp') {
                $('#' + config.element_id).html("StarGenetics: ClientApp starting");
                $('<iframe id="' + config.element_id + '_gwt" src="/StarGenetics/test.html"/>').appendTo($('#' + config.element_id).parent()).hide();

                this.wait_for_sg_interface('#' + config.element_id + '_gwt', config, self);
            } else if (config.Widget == 'SelectExperiment') {
                console.info("This builds select experiment ui");
                $('#' + config.element_id).html("StarGenetics: SelectExperiment");
                var SelectModule = require("StarGenetics/selectexperiment");
                var SelectWidget = new SelectModule.StarGeneticsSelectExperimentWidget(state, config);
            } else {
                console.info("This starts main");
                $('#' + config.element_id).html("StarGenetics: Other");
            }
            console.info("Welcome to SG " + config.element_id);
            console.info(StarGeneticsGlobalState);
        };

        StarGenetics.prototype.wait_for_sg_interface = function (id, config, self) {
            var iframe = $(id)[0];
            var w = iframe['contentWindow'];

            if (w.__sg_bg_exec) {
                self.stargenetics_interface = w.__sg_bg_exec;
                console.info("Got it!...");
                $('#' + config.element_id).html("StarGenetics: ClientApp running");
                window['stargenetics_interface'] = self.stargenetics_interface;
                self.start_client_app(self);
            } else {
                setTimeout(function () {
                    self.wait_for_sg_interface(id, config, self);
                }, 250);
                console.info("Waiting...");
            }
        };

        StarGenetics.prototype.start_client_app = function (self) {
            var main = $('#' + this.config.element_id);
            main.html(SGUIMAIN.main({ config: this.config }));
            $('.sg_open_ps', main).off('click').on('click', function () {
                console.info("Click on open");
                self.open();
            });
            self.open();
        };

        StarGenetics.prototype.open = function () {
            var self = this;
            this.stargenetics_interface({
                token: '1',
                command: 'open',
                data: {
                    protocol: 'Version_1',
                    model: this.model
                },
                callbacks: {
                    onsuccess: function (a, b) {
                        self.open_workspace();
                        self.list_strains();
                        console.info("Open Problem Set");
                        console.info(a);
                        console.info(b);
                    },
                    onerror: function () {
                        console.info("Got error!");
                    }
                }
            });
        };

        StarGenetics.prototype.list_strains = function () {
            var self = this;
            this.stargenetics_interface({
                token: '1',
                command: 'liststrains',
                data: {},
                callbacks: {
                    onsuccess: function (data, b) {
                        console.info("liststrains");
                        var strains = data.payload.strains;
                        self.strains = strains;
                        self.open_workspace();
                    },
                    onerror: function () {
                        console.info("Got error!");
                    }
                }
            });
        };

        StarGenetics.prototype.open_workspace = function () {
            var main = $('.sg_workspace', '#' + this.config.element_id);
            main.html(SGUIMAIN.workspace({ strains: this.strains }));
            $('.sg_strain_box').draggable({});
        };
        return StarGenetics;
    })();
    exports.StarGenetics = StarGenetics;

    if (false) {
        var x = new StarGenetics();
    }
});
//@ sourceMappingURL=main.js.map
