/// <reference path="../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/jquery.d.ts" />
/// <reference path="config.d.ts" />
/// <amd-dependency path="StarGenetics/stargeneticsws.soy" />

declare var window;

var SGUI   = require("StarGenetics/stargeneticsws.soy");
import Config = module("StarGenetics/config");

import jQlib = module("lib/jquery");
//import ga = module("lib/google_analytics");

var $:JQueryStatic = jQuery;

var StarGeneticsGlobalState = {};

export class StarGenetics {
    config:StarGeneticsConfig;

    set_message(message) {
        $('#' + this.config.element_id).html(message);

    }

    configure(config:StarGeneticsConfig) {
        var self = this;
        this.config = config;
        if( config.Widget == 'StudentID')
        {
            StarGeneticsGlobalState.StudentID = { 'element_id': config.element_id , student_id: config.StudentID};


        }
        else if( config.Widget == 'SelectExperiment' )
        {
            console.info( "This builds select experiment ui");

        }
        else {
            StarGeneticsGlobalState.App = { 'element_id': config.element_id };

            console.info( "This starts main");
        }
        console.info( "Welcome to SG");
        console.info( StarGeneticsGlobalState );
    }

    configure2(config:StarGeneticsConfig) {
        var self = this;
        this.config = config;
//        console.info( Config.config ) ;
        console.info("Configure " + config.StarX);
        $('#' + config.element_id).html(SGUI.before_open());
        //var q = new ga.GoogleAnalytics('UA-1048253-18');
        //q.trackEvent( 'StarX' , 'Test 2' , 'DistanceMatrix');
        var callbacks = {
            onclose: function (socket, event) {
                console.info(SGUI.before_open());
                self.set_message(
                    "<b>StarGenetics not connected!</b><br>" + new Date());
                setTimeout(function () {
                    self.establish_connection(callbacks)
                }, 500);
            },
            onopen: function (socket, event) {
                self.set_message("Connection established!");
                var $element = $('#' + config.element_id);
                $element.html(SGUI.onopen());
                $('button.open_experiment',$element).click(function(){
                    var msg ={"command":"open","url":"http://star.mit.edu/media/uploads/genetics/exercises_source_files/cow_exercise_1.xls","title":"Example Experiment"};
                    socket.send(JSON.stringify(msg));
                });
                $('button.save_experiment',$element).click(function(){
                    var msg ={"command":"save"};
                    socket.send(JSON.stringify(msg));
                });

            },
            onmessage: function (socket, messageevent) {
//                self.set_message(messageevent.data);
                console.info( messageevent );
                var message = JSON.parse(messageevent.data);
                console.info( message ) ;
                if( message['command'] == 'save_response') {
                    $('.save_experiment_output').html(message['blob']);
                }
                //socket.send("You said:" + messageevent.data);

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
