define(["require", "exports", "StarGenetics/json_sample_model", "StarGenetics/jsappmodel", "jquery", "jquery-ui", "StarGenetics/json_sample_model"], function(require, exports, __json_sample_model__, __SGModel__) {
    var SGUIMAIN = require("StarGenetics/sg_client_mainframe.soy");
    var json_sample_model = __json_sample_model__;
    var SGModel = __SGModel__;
    

    var $ = jQuery;

    var StarGeneticsJSAppWidget = (function () {
        function StarGeneticsJSAppWidget(state, config) {
            this.state = state;
            this.config = config;
            this.init();
            console.info(state);
            this.initModel();
        }
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
                self.start_client_app(self);
            } else {
                setTimeout(function () {
                    self.wait_for_sg_interface(id, config, self);
                }, 250);
                console.info("Waiting...");
            }
        };

        StarGeneticsJSAppWidget.prototype.start_client_app = function (self) {
            var main = $('#' + this.config.element_id);
            main.html(SGUIMAIN.main({ config: this.config }));
            $('.sg_open_ps', main).off('click').on('click', function () {
                console.info("Click on open");
                self.open();
            });
            self.open();
        };

        StarGeneticsJSAppWidget.prototype.open = function () {
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
                        console.info("Gor OK! on open");
                        self.show();
                        self.list_strains();
                        console.info("Gor OK! on open done");
                    },
                    onerror: function () {
                        console.info("Got error! on open");
                    }
                }
            });
        };

        StarGeneticsJSAppWidget.prototype.list_strains = function () {
            console.info("Running liststrain");
            var self = this;
            this.stargenetics_interface({
                token: '1',
                command: 'liststrains',
                data: {},
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
                var collapsable = self.model.ui.get($(this).data('kind'));
                collapsable.expanded = $(this).data('expanded');
                self.show();
            });
            $('.sg_strain_expand_visuals').off('click').on('click', function () {
                var collapsable = self.model.ui.get($(this).data('kind'));
                collapsable.visualsVisible = $(this).data('expanded-visuals');
                self.show();
            });
            $('.sg_strain_expand_properties').off('click').on('click', function () {
                var collapsable = self.model.ui.get($(this).data('kind'));
                collapsable.propertiesVisible = $(this).data('expanded-properties');
                self.show();
            });

            $('.sg_strain_box').draggable({ cursor: "crosshair", revert: true });
            $('.sg_experiment_parent').droppable({
                accept: '.sg_strain_box',
                drop: function (e, ui) {
                    console.info(this);
                    console.info(e);
                    console.info(ui);
                }
            });
        };
        return StarGeneticsJSAppWidget;
    })();
    exports.StarGeneticsJSAppWidget = StarGeneticsJSAppWidget;
});
//@ sourceMappingURL=jsappwidget.js.map
