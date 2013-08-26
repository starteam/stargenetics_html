define(["require", "exports", "StarGenetics/stargeneticsws.soy"], function(require, exports) {
    var SGUI = require("StarGenetics/stargeneticsws.soy");

    var StarGeneticsAppWidget = (function () {
        function StarGeneticsAppWidget(state, config) {
            this.state = state;
            this.$element = $('#' + this.state.StarGeneticsAppWidgetState.uid);
            this.set_message(SGUI.before_open());
            this.init();
        }
        StarGeneticsAppWidget.prototype.element = function () {
            return $('#' + this.state.StarGeneticsAppWidgetState.uid);
        };

        StarGeneticsAppWidget.prototype.set_message = function (message) {
            $('#' + this.state.StarGeneticsAppWidgetState.uid).html(message);
        };

        StarGeneticsAppWidget.prototype.init = function () {
            var self = this;
            var callbacks = {
                onclose: function (socket, event) {
                    self.set_message("<b>StarGenetics not connected!</b><br>" + new Date());
                    setTimeout(function () {
                        self.establish_connection(callbacks);
                    }, 500);
                },
                onopen: function (socket, event) {
                    self.set_message("Connection established!");
                    var $element = self.element();
                    $element.html(SGUI.onopen());
                    $('button.open_experiment', $element).click(function () {
                        var msg = { "command": "open", "url": "http://star.mit.edu/media/uploads/genetics/exercises_source_files/cow_exercise_1.xls", "title": "Example Experiment" };
                        socket.send(JSON.stringify(msg));
                    });
                    $('button.save_experiment', $element).click(function () {
                        var msg = { "command": "save" };
                        socket.send(JSON.stringify(msg));
                    });
                },
                onmessage: function (socket, messageevent) {
                    var message = JSON.parse(messageevent.data);
                    if (message['command'] == 'save_response') {
                        var input_element = null;
                        if (input_element) {
                            $(input_element).attr('value', message['blob']);
                        }
                        $('.save_experiment_output').html(message['blob']);
                    }
                }
            };
            this.establish_connection(callbacks);
        };

        StarGeneticsAppWidget.prototype.establish_connection = function (callbacks) {
            var port = 25261;
            var socket = new WebSocket("ws://localhost:" + port + "/", "stargenetics");

            console.info("establish_connection");
            function ping(socket) {
                if (socket.readyState == WebSocket.OPEN) {
                    console.info("ping");
                    socket.send('{"command":"ping"}');
                    setTimeout(function () {
                        ping(socket);
                    }, 30000);
                }
            }

            socket.onopen = function (a) {
                console.info("onopen");
                console.info(a);
                console.info(socket);
                callbacks.onopen(socket, a);
                ping(socket);
            };
            socket.onclose = function (closeevent) {
                callbacks.onclose(socket, closeevent);
            };
            socket.onerror = function (a) {
            };
            socket.onmessage = function (messageevent) {
                console.info("onmessage");
                callbacks.onmessage(socket, messageevent);
            };
        };
        return StarGeneticsAppWidget;
    })();
    exports.StarGeneticsAppWidget = StarGeneticsAppWidget;
});
//@ sourceMappingURL=appwidget.js.map
