define(["require", "exports", "StarGenetics/stargeneticsws.soy"], function(require, exports) {
    var SGUI = require("StarGenetics/stargeneticsws.soy");
    

    

    var $ = jQuery;

    var StarGenetics = (function () {
        function StarGenetics() {
        }
        StarGenetics.prototype.set_message = function (message) {
            $('#' + this.config.element_id).html(message);
        };

        StarGenetics.prototype.configure = function (config) {
            var self = this;
            this.config = config;

            console.info("Configure " + config.StarX);
            $('#' + config.element_id).html(SGUI.before_open());

            var callbacks = {
                onclose: function (socket, event) {
                    console.info(SGUI.before_open());
                    self.set_message("<b>StarGenetics not connected!</b><br>" + new Date());
                    setTimeout(function () {
                        self.establish_connection(callbacks);
                    }, 500);
                },
                onopen: function (socket, event) {
                    self.set_message("Connection established!");
                    var $element = $('#' + config.element_id);
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
                    console.info(messageevent);
                    var message = JSON.parse(messageevent.data);
                    console.info(message);
                    if (message['command'] == 'save_response') {
                        $('.save_experiment_output').html(message['blob']);
                    }
                }
            };
            this.establish_connection(callbacks);
        };

        StarGenetics.prototype.establish_connection = function (callbacks) {
            var port = 25261;
            var socket = new WebSocket("ws://localhost:" + port + "/", "stargenetics");
            socket.onopen = function (a) {
                console.info("onopen");
                console.info(a);
                console.info(socket);
                callbacks.onopen(socket);
            };
            socket.onclose = function (closeevent) {
                console.info("onclose");
                console.info(closeevent);
                console.info(socket);
                callbacks.onclose(socket, closeevent);
            };
            socket.onerror = function (a) {
                console.info("onerror");
                console.info(a);
            };
            socket.onmessage = function (messageevent) {
                console.info("onmessage");
                callbacks.onmessage(socket, messageevent);
            };
        };
        return StarGenetics;
    })();
    exports.StarGenetics = StarGenetics;

    if (false) {
        var x = new StarGenetics();
    }
});
//@ sourceMappingURL=main.js.map
