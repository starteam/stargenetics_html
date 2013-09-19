/// <reference path="state.ts" />
/// <reference path="config.d.ts" />
/// <reference path="jsappmodel.ts" />
/// <reference path="visualizers/smiley.ts" />
/// <reference path="../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/jquery.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/jquery-ui-1.8.x.d.ts" />

/// <amd-reference path="StarGenetics/sg_client_mainframe.soy" />
/// <amd-dependency path="jquery" />
/// <amd-dependency path="jquery-ui" />
/// <amd-dependency path="StarGenetics/json_sample_model" />


var SGUIMAIN:any = require("StarGenetics/sg_client_mainframe.soy");
import json_sample_model = require("StarGenetics/json_sample_model");
import SGModel = require("StarGenetics/jsappmodel");
import SGState = require("state");
import SGSmiley = require("StarGenetics/visualizers/smiley");
declare var jQuery;
var $ = jQuery;

export class StarGeneticsJSAppWidget {
    state:SGState.StarGeneticsState;
    config:StarGeneticsConfig;
    stargenetics_interface:any;
    model:SGModel.Top;

    constructor(state:SGState.StarGeneticsState, config:StarGeneticsConfig) {
        this.state = state;
        this.config = config;
        this.init();
        console.info(state);
        this.initModel();
    }

    run() {

    }


    initModel() {
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
    }

    init() {
        var config = this.config;
        $('#' + config.element_id).html("StarGenetics: ClientApp starting");
        $('<iframe id="' + config.element_id + '_gwt" src="/StarGenetics/gwtframe.html"/>').appendTo($('#' + config.element_id).parent()).hide();
        this.wait_for_sg_interface('#' + config.element_id + '_gwt', config, this);
    }

    wait_for_sg_interface(id, config, self) {
        var iframe = $(id)[0];
        var w = iframe['contentWindow'];

        if (w.__sg_bg_exec) {

            self.stargenetics_interface = w.__sg_bg_exec;
            console.info("Got it!... the interface");
            $('#' + config.element_id).html("StarGenetics: ClientApp running");
            window['stargenetics_interface'] = self.stargenetics_interface;
            self.start_client_app(self);

        }
        else {
            setTimeout(function () {
                self.wait_for_sg_interface(id, config, self)
            }, 250);
            console.info("Waiting...");
        }
    }

    start_client_app(self) {
        var main = $('#' + this.config.element_id);
        main.html(SGUIMAIN.main({config: this.config}));
        $('.sg_open_ps', main).off('click').on('click', function () {
            console.info("Click on open");
            self.open();
        });
        self.open();
    }

    open() {
        var self:StarGeneticsJSAppWidget = this;
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

    }

    list_strains() {
        console.info("Running liststrain");
        var self:StarGeneticsJSAppWidget = this;
        this.stargenetics_interface({
            token: '1',
            command: 'liststrains',
            data: {
            },
            callbacks: {
                onsuccess: function (data, b) {
                    console.info("liststrains OK");
                    var strains = data.payload.strains;
                    console.info("strains is ");
                    console.info(data);

                    self.model.ui.strains.set_list(strains);
                    console.info(self.model.ui.strains.list);
                    self.show();
                },
                onerror: function (q) {
                    window['e'] = this;
                    window['q'] = q;
                    window['qq'] = self;
                    console.info("liststrains Got error!" + JSON.stringify(q));
                }
            }
        });
    }

    update_experiments( experiments:SGModel.Experiment[] ) {
        console.info("Running update_experiments");
        var self:StarGeneticsJSAppWidget = this;
        this.stargenetics_interface({
            token: '1',
            command: 'updateexperiments',
            data: {
                experiments: _.each( experiments, function(e) { return e.toJSON() })
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

    }

    show() {
        var self:StarGeneticsJSAppWidget = this;
        var main = $('.sg_workspace', '#' + this.config.element_id);
        main.html(SGUIMAIN.workspace({model: this.model}));

        $('.sg_expand').off('click').on('click', function () {
            var c:SGModel.Collapsable = self.model.ui.get($(this).data('kind'));
            c.expanded = $(this).data('expanded');
            self.show();
        });
        $('.sg_strain_expand_visuals').off('click').on('click', function () {
            var c:SGModel.Collapsable = self.model.ui.get($(this).data('kind'));
            c.visualsVisible = $(this).data('expanded-visuals');
            self.show();
        });
        $('.sg_strain_expand_properties').off('click').on('click', function () {
            var c:SGModel.Collapsable = self.model.ui.get($(this).data('kind'));
            c.propertiesVisible = $(this).data('expanded-properties');
            self.show();
        });

        $('.sg_clear_parents').off('click').on('click', function () {
            var c:SGModel.Experiment = <SGModel.Experiment>self.model.ui.get($(this).data('kind'));
            c.clearParents();
            self.show();
        });

        $('.sg_new_experiment_mate').off('click').on('click', function () {
            var c:SGModel.Experiment = <SGModel.Experiment>self.model.ui.get($(this).data('kind'));
            c.clearParents();
            self.show();
        });

        $('.sg_strain_box').draggable({revert: true});
        $('.sg_experiment_parent').droppable({accept: '.sg_strain_box',
            drop: function (e, ui) {
                var target = $(this);
                var source = ui.draggable;

                var src_collection:SGModel.Collapsable = self.model.ui.get(source.data('kind'));
                var src_strain:SGModel.Strain = src_collection.get(source.data('id'));
                var target_collection:SGModel.Experiment = <SGModel.Experiment>self.model.ui.get(target.data('kind'));
                target_collection.addParent(src_strain);
                self.show();
            }});

        var visualizer:SGSmiley.Smiley = new SGSmiley.Smiley();
        $('.sg_strain_visual canvas').each( function(){
            var c:SGModel.Collapsable = self.model.ui.get($(this).data('kind'));
            var organism = c.get( $(this).data('id'));
            visualizer.render($(this)[0],organism.properties );
            window['c'] = this;
            window['v'] = visualizer;
        });
    }

}