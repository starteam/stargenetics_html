define(["require", "exports"], function(require, exports) {
    

    

    var $ = jQuery;

    var StarGenetics = (function () {
        function StarGenetics() {
        }
        StarGenetics.prototype.configure = function (config) {
            this.config = config;

            console.info("Configure " + config.StarX);
            $('#' + config.element_id).html("Hello!");
        };
        return StarGenetics;
    })();
    exports.StarGenetics = StarGenetics;

    if (false) {
        var x = new StarGenetics();
    }
});
//@ sourceMappingURL=main.js.map
