/// <reference path="../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/jquery.d.ts" />
/// <reference path="config.d.ts" />

declare var window;

import Config = module("StarGenetics/config");

import jQlib = module("lib/jquery");
//import ga = module("lib/google_analytics");

var $:JQueryStatic = jQuery;

export class StarGenetics {
    config:StarGeneticsConfig;

    configure(config:StarGeneticsConfig) {
        this.config = config;
//        console.info( Config.config ) ;
        console.info("Configure " + config.StarX);
        $('#' + config.element_id).html("Hello!");
        //console.info(ga);

        //var q = new ga.GoogleAnalytics('UA-1048253-18');
        //q.trackEvent( 'StarX' , 'Test 2' , 'DistanceMatrix');

    }
}

if (false) {
    var x = new StarGenetics();
}
