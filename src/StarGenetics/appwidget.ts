/// <reference path="../../../starx/src/StarX/lib/jquery.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/require.d.ts" />
/// <amd-dependency path="StarGenetics/stargeneticsws.soy" />
/// <reference path="StarGenetics/state.ts" />
/// <reference path="StarGenetics/config.d.ts" />

var SGUI   = require("StarGenetics/stargeneticsws.soy");


export class StarGeneticsAppWidget {
    state:StarGeneticsState;

    element() {
        return $('#' + this.state.StarGeneticsAppWidgetState.uid);
    }

    set_message(message) {
        $('#' + this.state.StarGeneticsAppWidgetState.uid).html(message);
    }


    constructor(state:StarGeneticsState, config:StarGeneticsConfig) {
        this.state = state;
        this.$element = $('#' + this.state.StarGeneticsAppWidgetState.uid);
        this.set_message(SGUI.before_open());
        this.init();
    }

    init()
    {
        var self = this;
        var callbacks = {
            onclose: function (socket, event) {
                self.set_message(
                    "<b>StarGenetics not connected!</b><br>" + new Date());
                setTimeout(function () {
                    self.establish_connection(callbacks)
                }, 500);
            },
            onopen: function (socket, event) {
                self.set_message("Connection established!");
                var $element = self.element();
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
                    var input_element = null; //this.state.StarGeneticsAppWidgetState.input_element;
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

        console.info( "establish_connection");
        function ping( socket )
        {
            if( socket.readyState == WebSocket.OPEN )
            {
                console.info( "ping");
                socket.send( '{"command":"ping"}' );
                setTimeout( function() { ping(socket);} , 30000 ) ;
            }
        }

        socket.onopen = function (a) {
            console.info("onopen");
            console.info(a);
            console.info(socket);
            callbacks.onopen(socket, a);
            ping(socket);
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