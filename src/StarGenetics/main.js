define(["require", "exports"], function(require, exports) {
    

    

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
            $('#' + config.element_id).html("Hello!");

            var callbacks = {
                onclose: function (socket, event) {
                    self.set_message("<b>StarGenetics not connected!</b><br>" + new Date());
                    setTimeout(function () {
                        self.establish_connection(callbacks);
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
