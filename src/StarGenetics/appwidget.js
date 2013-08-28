define(["require", "exports", "StarGenetics/stargeneticsws.soy"], function(require, exports) {
    var SGUI = require("StarGenetics/stargeneticsws.soy");

    var StarGeneticsAppWidget = (function () {
        function StarGeneticsAppWidget(state, config) {
            this.state = state;
            this.widget_state = state.StarGeneticsAppWidgetState;
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

        StarGeneticsAppWidget.prototype.set_state = function (data) {
            this.state.StarGeneticsAppWidgetState.input_element.attr('value', data);
        };

        StarGeneticsAppWidget.prototype.get_state = function () {
            return this.state.StarGeneticsAppWidgetState.input_element.attr('value');
        };

        StarGeneticsAppWidget.prototype.init = function () {
            var self = this;
            this.establish_connection();
        };

        StarGeneticsAppWidget.prototype.ping = function (socket) {
            var self = this;
            if (socket.readyState == WebSocket.OPEN) {
                console.info("ping");
                socket.send('{"command":"ping"}');
                setTimeout(function () {
                    self.ping(socket);
                }, 30000);
            }
        };

        StarGeneticsAppWidget.prototype.onopen = function (socket, event) {
            this.set_message("Connection established!");
            var data = this.get_state();
            var context = {
                open: ('' + data).length > 16,
                new: true,
                save: false,
                socket: socket
            };
            this.update_ui(context);
        };

        StarGeneticsAppWidget.prototype.onmessage = function (socket, messageevent) {
            var message = JSON.parse(messageevent.data);
            console.info("onmessage");
            console.info(message);
            if (message['command'] == 'save_response') {
                var data = message['stream'];
                this.set_state(data);
                $('.save_experiment_output').html(data);
                var data = this.get_state();
                var context = {
                    open: ('' + data).length > 16,
                    new: true,
                    save: true,
                    socket: socket
                };
                this.update_ui(context);
            }
        };

        StarGeneticsAppWidget.prototype.onclose = function (socket, event) {
            var self = this;
            this.set_message("<b>StarGenetics not connected!</b><br>" + new Date());
            setTimeout(function () {
                self.establish_connection();
            }, 500);
        };

        StarGeneticsAppWidget.prototype.onerror = function (socket, event) {
        };

        StarGeneticsAppWidget.prototype.update_ui = function (context) {
            var self = this;
            var $element = this.element();
            $element.html(SGUI.onopen(context));

            $('button.sg_new_experiment', $element).click(function () {
                self.new_ps(context.socket);
            });
            $('button.sg_open_experiment', $element).click(function () {
                self.open_ps(context.socket);
            });

            $('button.sg_save_experiment', $element).click(function () {
                self.save_ps(context.socket);
            });
        };

        StarGeneticsAppWidget.prototype.new_ps = function (socket) {
            socket.send(JSON.stringify(this.widget_state.new));
        };

        StarGeneticsAppWidget.prototype.save_ps = function (socket) {
            socket.send(JSON.stringify(this.widget_state.save));
        };

        StarGeneticsAppWidget.prototype.open_ps = function (socket) {
            var open = this.widget_state.open;
            open.stream = this.get_state();
            $.ajax({
                url: 'http://localhost:25261/',
                type: 'post',
                data: { data: JSON.stringify(open) }
            });
        };

        StarGeneticsAppWidget.prototype.establish_connection = function () {
            var port = 25261;
            var socket = new WebSocket("ws://localhost:" + port + "/", "stargenetics");
            var self = this;

            console.info("establish_connection");

            socket.onopen = function (a) {
                self.onopen(socket, a);
                self.ping(socket);
                self.state.onopen(socket, a);
            };
            socket.onclose = function (closeevent) {
                self.onclose(socket, closeevent);
            };
            socket.onerror = function (a) {
                self.onerror(socket, a);
            };
            socket.onmessage = function (messageevent) {
                self.onmessage(socket, messageevent);
                self.state.onmessage(messageevent);
            };
        };
        return StarGeneticsAppWidget;
    })();
    exports.StarGeneticsAppWidget = StarGeneticsAppWidget;
});
//@ sourceMappingURL=appwidget.js.map
