define(["require", "exports", "StarGenetics/json_sample_model", "StarGenetics/jsappmodel", "StarGenetics/visualizers/smiley", "StarGenetics/tests/qunit", "jquery", "jquery-ui", "StarGenetics/json_sample_model"], function(require, exports, __json_sample_model__, __SGModel__, __SGSmiley__, __SGTests__) {
    var SGUIMAIN = require("StarGenetics/sg_client_mainframe.soy");
    var json_sample_model = __json_sample_model__;
    var SGModel = __SGModel__;
    
    var SGSmiley = __SGSmiley__;
    var SGTests = __SGTests__;

    var $ = jQuery;

    var StarGeneticsJSAppWidget = (function () {
        function StarGeneticsJSAppWidget(state, config) {
            var self = this;
            this.state = state;
            this.config = config;
            this.init();
            this.initModel();
        }
        StarGeneticsJSAppWidget.prototype.init = function () {
            var config = this.config;
            $('#' + config.element_id).html("StarGenetics: ClientApp starting");
            $('<iframe id="' + config.element_id + '_gwt" src="/StarGenetics/gwtframe.html"/>').appendTo($('#' + config.element_id).parent()).hide();
            this.wait_for_sg_interface('#' + config.element_id + '_gwt', config, this);
        };

        StarGeneticsJSAppWidget.prototype.wait_for_sg_interface = function (id, config, self) {
            var iframe = $(id)[0];
            var w = iframe['contentWindow'];

            if (w.__sg_bg_exec) {
                self.stargenetics_interface = w.__sg_bg_exec;
                console.info("Got it!... the interface");
                $('#' + config.element_id).html("StarGenetics: ClientApp running");
                window['stargenetics_interface'] = self.stargenetics_interface;
                self.postInit();
            } else {
                setTimeout(function () {
                    self.wait_for_sg_interface(id, config, self);
                }, 250);
                console.info("Waiting...");
            }
        };

        StarGeneticsJSAppWidget.prototype.postInit = function () {
            this.start_client_app();
            this.testHook();
        };

        StarGeneticsJSAppWidget.prototype.start_client_app = function () {
            var self = this;
            var main = $('#' + this.config.element_id);
            main.html(SGUIMAIN.main({ config: this.config }));
            $('.sg_open_ps', main).off('click').on('click', function () {
                console.info("Click on open");
                self.open();
            });
        };

        StarGeneticsJSAppWidget.prototype.testHook = function () {
            var self = this;
            if (SGTests.isTesting()) {
                SGTests.load(function (qunit) {
                    require(["StarGenetics/tests/suite"], function (suite) {
                        suite.testSuite(qunit, self);
                    });
                });
            }
        };

        StarGeneticsJSAppWidget.prototype.run = function () {
        };

        StarGeneticsJSAppWidget.prototype.initModel = function () {
            var model = new SGModel.Top({
                backend: json_sample_model.model1,
                ui: {
                    strains: {
                        list: []
                    },
                    new_experiment: {
                        list: []
                    }
                }
            });
            this.model = model;
            window['model'] = model;
            console.info(model);
        };

        StarGeneticsJSAppWidget.prototype.open = function (callbacks) {
            var self = this;
            this.stargenetics_interface({
                token: '1',
                command: 'open',
                data: {
                    protocol: 'Version_1',
                    model: this.model.backend
                },
                callbacks: {
                    onsuccess: function (a, b) {
                        SGTests.onsuccess(callbacks);
                        self.show();
                    },
                    onerror: function () {
                        SGTests.onerror(callbacks);
                    }
                }
            });
        };

        StarGeneticsJSAppWidget.prototype.list_strains = function (callbacks) {
            console.info("Running liststrain");
            var self = this;
            this.stargenetics_interface({
                token: '1',
                command: 'liststrains',
                data: {},
                callbacks: {
                    onsuccess: function (data, b) {
                        var strains = data.payload.strains;
                        SGTests.onsuccess(callbacks);
                        self.model.ui.strains.set_list(strains);
                        self.show();
                    },
                    onerror: function (q) {
                        SGTests.onerror(callbacks);
                    }
                }
            });
        };

        StarGeneticsJSAppWidget.prototype.update_experiments = function (experiments) {
            console.info("Running update_experiments");
            var self = this;
            this.stargenetics_interface({
                token: '1',
                command: 'updateexperiments',
                data: {
                    experiments: _.each(experiments, function (e) {
                        return e.toJSON();
                    })
                },
                callbacks: {
                    onsuccess: function (data, b) {
                        console.info("liststrains OK");
                        var strains = data.payload.strains;
                        console.info("strains is ");
                        self.model.ui.strains.set_list(strains);
                        console.info(self.model.ui.strains.list);
                        self.show();
                    },
                    onerror: function () {
                        console.info("liststrains Got error!");
                    }
                }
            });
        };

        StarGeneticsJSAppWidget.prototype.show = function () {
            var self = this;
            var main = $('.sg_workspace', '#' + this.config.element_id);
            main.html(SGUIMAIN.workspace({ model: this.model }));

            $('.sg_expand').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                c.expanded = $(this).data('expanded');
                self.show();
            });
            $('.sg_strain_expand_visuals').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                c.visualsVisible = $(this).data('expanded-visuals');
                self.show();
            });
            $('.sg_strain_expand_properties').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                c.propertiesVisible = $(this).data('expanded-properties');
                self.show();
            });

            $('.sg_clear_parents').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                c.clearParents();
                self.show();
            });

            $('.sg_new_experiment_mate').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                c.clearParents();
                self.show();
            });

            $('.sg_strain_box').draggable({ revert: true });
            $('.sg_experiment_parent').droppable({
                accept: '.sg_strain_box',
                drop: function (e, ui) {
                    var target = $(this);
                    var source = ui.draggable;

                    var src_collection = self.model.ui.get(source.data('kind'));
                    var src_strain = src_collection.get(source.data('id'));
                    var target_collection = self.model.ui.get(target.data('kind'));
                    target_collection.addParent(src_strain);
                    self.show();
                }
            });

            var visualizer = new SGSmiley.Smiley();
            $('.sg_strain_visual canvas').each(function () {
                var c = self.model.ui.get($(this).data('kind'));
                var organism = c.get($(this).data('id'));
                visualizer.render($(this)[0], organism.properties);
                window['c'] = this;
                window['v'] = visualizer;
            });
        };
        return StarGeneticsJSAppWidget;
    })();
    exports.StarGeneticsJSAppWidget = StarGeneticsJSAppWidget;
});
//@ sourceMappingURL=jsappwidget.js.map
