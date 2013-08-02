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

    set_message(message) {
        $('#' + this.config.element_id).html(message);

    }

    configure(config:StarGeneticsConfig) {
        var self = this;
        this.config = config;
//        console.info( Config.config ) ;
        console.info("Configure " + config.StarX);
        $('#' + config.element_id).html("Hello!");
        //console.info(ga);

        //var q = new ga.GoogleAnalytics('UA-1048253-18');
        //q.trackEvent( 'StarX' , 'Test 2' , 'DistanceMatrix');
        var callbacks = {
            onclose: function (socket, event) {
                self.set_message("<b>StarGenetics not connected!</b><br>" + new Date());
                setTimeout(function () {
                    self.establish_connection(callbacks)
                }, 500);
            },
            onopen: function (socket, event) {
                self.set_message("Connection established!");
                socket.send("Hello StarGenetics, how are you today?");
            },
            onmessage: function (socket, messageevent) {
                self.set_message(messageevent.data);
                socket.send("You said:" + messageevent.data);

            }

        };
        this.establish_connection(callbacks);
    }

    establish_connection(callbacks) {
        var port = 25261;
        var socket = new WebSocket("ws://localhost:" + port + "/", "stargenetics");
        socket.onopen = function (a) {
            console.info("onopen");
            console.info(a);
            console.info(socket);
            callbacks.onopen(socket);
        }
        socket.onclose = function (closeevent) {
            console.info("onclose");
            console.info(closeevent);
            console.info(socket);
            callbacks.onclose(socket, closeevent);
        }
        socket.onerror = function (a) {
            console.info("onerror");
            console.info(a);
            //callbacks.onerror(socket);
        }
        socket.onmessage = function (messageevent) {
            console.info("onmessage");
            callbacks.onmessage(socket, messageevent);
        }

    }
}

if (false) {
    var x = new StarGenetics();
}
