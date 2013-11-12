define(["require", "exports"], function(require, exports) {
    var BaseVisualizer = (function () {
        function BaseVisualizer() {
            this.width = 75;
            this.height = 75;
        }
        BaseVisualizer.prototype.render = function (canvas, properties) {
        };
        return BaseVisualizer;
    })();
    exports.BaseVisualizer = BaseVisualizer;
});
//@ sourceMappingURL=base.js.map
