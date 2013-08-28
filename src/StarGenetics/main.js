define(["require", "exports", "StarGenetics/stargeneticsws.soy", "StarGenetics/state", "StarGenetics/appwidget", "StarGenetics/selectexperiment"], function(require, exports) {
    var SGUI = require("StarGenetics/stargeneticsws.soy");

    

    

    var $ = jQuery;

    var GlobalState = require("StarGenetics/state");
    var StarGeneticsGlobalState = new GlobalState.StarGeneticsGlobalState();

    var StarGenetics = (function () {
        function StarGenetics() {
        }
        StarGenetics.prototype.set_message = function (message) {
            $('#' + this.config.element_id).html(message);
        };

        StarGenetics.prototype.configure = function (config) {
            var self = this;
            this.config = config;
            var state = StarGeneticsGlobalState.get_state(config);
            if (config.Widget == 'StudentID') {
                var StudentID = state.setStudentID(config);
                $('#' + StudentID.uid).html("StudentID set.");
            } else if (config.Widget == 'App') {
                state.setApp(config);
                var AppModule = require("StarGenetics/appwidget");
                var AppWidget = new AppModule.StarGeneticsAppWidget(state);
            } else if (config.Widget == 'SelectExperiment') {
                console.info("This builds select experiment ui");
                $('#' + config.element_id).html("StarGenetics: SelectExperiment");
                var SelectModule = require("StarGenetics/selectexperiment");
                var SelectWidget = new SelectModule.StarGeneticsSelectExperimentWidget(state, config);
            } else {
                console.info("This starts main");
                $('#' + config.element_id).html("StarGenetics: Other");
            }
            console.info("Welcome to SG");
            console.info(StarGeneticsGlobalState);
        };
        return StarGenetics;
    })();
    exports.StarGenetics = StarGenetics;

    if (false) {
        var x = new StarGenetics();
    }
});
//@ sourceMappingURL=main.js.map
