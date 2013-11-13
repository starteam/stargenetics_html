define(["require", "exports"], function(require, exports) {
    var BaseVisualizer = (function () {
        function BaseVisualizer() {
            this.width = 75;
            this.height = 75;
        }
        BaseVisualizer.prototype.prepare = function (canvas) {
            canvas.setAttribute('width', '' + this.width);
            canvas.setAttribute('height', '' + this.height);
            var context = canvas.getContext("2d");
            context.save();
            context.scale(this.width / 4, this.height / 4);
            context.translate(1, 1);
            return context;
        };

        BaseVisualizer.prototype.clearImage = function (context) {
            context.clearRect(-1, -1, 1, 1);
        };

        BaseVisualizer.prototype.commit = function (context) {
            context.restore();
        };
        return BaseVisualizer;
    })();
    exports.BaseVisualizer = BaseVisualizer;
});
//@ sourceMappingURL=base.js.map
