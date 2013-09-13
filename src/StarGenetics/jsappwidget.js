define(["require", "exports", "jquery", "jquery-ui", "StarGenetics/json_sample_model"], function(require, exports) {
    var SGUIMAIN = require("StarGenetics/sg_client_mainframe.soy");
    var json_sample_model = require("StarGenetics/json_sample_model");

    var $ = jQuery;

    var StarGeneticsJSAppWidget = (function () {
        function StarGeneticsJSAppWidget(state, config) {
            this.json_model = json_sample_model.model1;
            this.strains = [];
            this.state = state;
            this.config = config;
            this.init();
            console.info(state);
        }
        StarGeneticsJSAppWidget.prototype.init = function () {
            console.info("StarGeneticsJSAppWidget");
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
                    model: this.json_model
                },
                callbacks: {
                    onsuccess: function (a, b) {
                        self.show();
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

        StarGeneticsJSAppWidget.prototype.list_strains = function () {
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
                        self.show();
                    },
                    onerror: function () {
                        console.info("Got error!");
                    }
                }
            });
        };

        StarGeneticsJSAppWidget.prototype.show = function () {
            var main = $('.sg_workspace', '#' + this.config.element_id);
            main.html(SGUIMAIN.workspace({ strains: this.strains }));
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
