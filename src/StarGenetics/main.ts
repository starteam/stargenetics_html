/// <reference path="../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/jquery.d.ts" />
/// <reference path="config.d.ts" />
/// <amd-dependency path="StarGenetics/stargeneticsws.soy" />

declare var window;

var SGUI   = require("StarGenetics/stargeneticsws.soy");
console.info( "SGUI ");
console.info( SGUI );

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

    get_state(config:StarGeneticsConfig)
    {
        var Group = config['Group'] || 'default';
        if(! StarGeneticsGlobalState[Group] )
        {
            StarGeneticsGlobalState[Group] = {};
        }
        var state = StarGeneticsGlobalState[Group];
        return state;
    }

    get_input_element(config:StarGeneticsConfig)
    {
        var ret;
        if( config.State )
        {
            var jq = $('[name='+config.State+']');
            if( jq.size() )
            {
                var element = $('#'+jq.attr('inputid'));
                if( element.size() )
                {
                    ret = element[0];
                }
            }
        }
        return ret;
    }

    configure(config:StarGeneticsConfig) {
        var self = this;
        this.config = config;
        var state = this.get_state(config);

        if( config.Widget == 'StudentID')
        {
            state.StudentID = { 'element_id': config.element_id , student_id: config.StudentID};
            $('#'+config.element_id).html( "StarGenetics: StudentID");

        }
        else if( config.Widget == 'App') {
            state.App = { config: config , input_element: this.get_input_element(config) };
            this.configure2(config,state);
        }
        else if( config.Widget == 'SelectExperiment' )
        {
            console.info( "This builds select experiment ui");
            $('#'+config.element_id).html( "StarGenetics: SelectExperiment");

        }
        else {
            console.info( "This starts main");
            $('#'+config.element_id).html( "StarGenetics: Other");
        }
        console.info( "Welcome to SG");
        console.info( StarGeneticsGlobalState );
    }

    configure2(config:StarGeneticsConfig,state) {
        var self = this;
        this.config = config;
        console.info("Configure " + config.StarX);
        $('#' + config.element_id).html(SGUI.before_open());
        var callbacks = {
            onclose: function (socket, event) {
                SGUI.before_open();
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
                var message = JSON.parse(messageevent.data);
                if( message['command'] == 'save_response') {
                    console.info( state );
                    var input_element = state.App.input_element;
                    if( input_element )
                    {
                        $(input_element).attr('value', message['blob'])
                    }
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
            callbacks.onopen(socket, a);
        }
        socket.onclose = function (closeevent) {
//            console.info("onclose");
//            console.info(closeevent);
//            console.info(socket);
            callbacks.onclose(socket, closeevent);
        }
        socket.onerror = function (a) {
//            console.info("onerror");
//            console.info(a);
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
