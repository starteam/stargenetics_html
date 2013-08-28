define(["require", "exports"], function(require, exports) {
    var StarGeneticsSelectExperimentWidget = (function () {
        function StarGeneticsSelectExperimentWidget(state, config) {
            this.state = state;
            this.config = config;
            console.info("StarGeneticsSelectExperimentWidget");
            console.info(config);
            this.set_message("Welcome!");
            $('button', '#' + this.config['element_id']).click();
            window.select_experiment = this;
            state.listen_websocket(config, this);
        }
        StarGeneticsSelectExperimentWidget.prototype.set_message = function (message) {
            $('#' + this.config['element_id']).html(message);
        };

        StarGeneticsSelectExperimentWidget.prototype.onmessage = function (message) {
            var data = JSON.parse(message.data);
            if (data.command == 'list_experiment_response') {
                console.info("Experiment list");
                console.info(data.experiments);
            }
        };

        StarGeneticsSelectExperimentWidget.prototype.onopen = function (socket, event) {
            this.socket = socket;
            socket.send(JSON.stringify({ 'command': 'list_experiments' }));
        };
        return StarGeneticsSelectExperimentWidget;
    })();
    exports.StarGeneticsSelectExperimentWidget = StarGeneticsSelectExperimentWidget;
});
//@ sourceMappingURL=selectexperiment.js.map
