/// <reference path="../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/jquery.d.ts" />
/// <reference path="state.ts" />
/// <reference path="config.d.ts" />
/// <amd-dependency path="StarGenetics/stargeneticsws.soy" />
/// <amd-dependency path="StarGenetics/state" />
/// <amd-dependency path="StarGenetics/appwidget" />
/// <amd-dependency path="StarGenetics/selectexperiment" />

declare var window;

var SGUI   = require("StarGenetics/stargeneticsws.soy");

import Config = module("StarGenetics/config");

import jQlib = module("lib/jquery");
//import ga = module("lib/google_analytics");

var $:JQueryStatic = jQuery;

var GlobalState = require("StarGenetics/state");
var StarGeneticsGlobalState = new GlobalState.StarGeneticsGlobalState();

export class StarGenetics {
    config:StarGeneticsConfig;

    set_message(message) {
        $('#' + this.config.element_id).html(message);
    }

    configure(config:StarGeneticsConfig) {
        var self = this;
        this.config = config;
        var state = StarGeneticsGlobalState.get_state(config);
        if( config.Widget == 'StudentID')
        {
            var StudentID = state.setStudentID( config );
            $('#'+StudentID.uid).html( "StudentID set." );
        }
        else if( config.Widget == 'App') {
            state.setApp(config);
            var AppModule = require("StarGenetics/appwidget");
            var AppWidget = new AppModule.StarGeneticsAppWidget(state);
        }
        else if( config.Widget == 'SelectExperiment' )
        {
            console.info( "This builds select experiment ui");
            $('#'+config.element_id).html( "StarGenetics: SelectExperiment");
            var SelectModule = require("StarGenetics/selectexperiment");
            var SelectWidget = new SelectModule.StarGeneticsSelectExperimentWidget(state,config);
        }
        else {
            console.info( "This starts main");
            $('#'+config.element_id).html( "StarGenetics: Other");
        }
        console.info( "Welcome to SG");
        console.info( StarGeneticsGlobalState );
    }
}

if (false) {
    var x = new StarGenetics();
}
