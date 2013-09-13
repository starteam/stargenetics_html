/// <reference path="state.ts" />
/// <reference path="config.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/jquery.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/jquery-ui-1.8.x.d.ts" />

/// <amd-dependency path="jquery" />
/// <amd-dependency path="jquery-ui" />
/// <amd-dependency path="StarGenetics/json_sample_model" />


var SGUIMAIN = require("StarGenetics/sg_client_mainframe.soy");
var json_sample_model = require("StarGenetics/json_sample_model");

var $:JQueryStatic = jQuery;

export class StarGeneticsJSAppWidget {
    state:StarGeneticsState;
    config:StarGeneticsConfig;
    stargenetics_interface:any;
    json_model:any = json_sample_model.model1;

    strains:any = [];

    constructor(state:StarGeneticsState, config:StarGeneticsConfig) {
        this.state = state;
        this.config = config;
        this.init();
        console.info(state);
    }

    init() {
        console.info("StarGeneticsJSAppWidget");
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
            console.info("Got it!...");
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

    }


    list_strains() {
        var self = this;
        this.stargenetics_interface({
            token: '1',
            command: 'liststrains',
            data: {
            },
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
    }

    show() {
        var main = $('.sg_workspace', '#' + this.config.element_id);
        main.html(SGUIMAIN.workspace({strains: this.strains}));
        $('.sg_strain_box').draggable({cursor: "crosshair", revert: true});
        $('.sg_experiment_parent').droppable({accept: '.sg_strain_box',
            drop: function (e,ui) {
                console.info(this);
                console.info(e);
                console.info(ui);

            }});
    }

}