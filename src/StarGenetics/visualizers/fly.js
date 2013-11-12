var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "StarGenetics/visualizers/base"], function(require, exports, __base__) {
    var base = __base__;

    var Fly = (function (_super) {
        __extends(Fly, _super);
        function Fly() {
            _super.apply(this, arguments);
        }
        Fly.prototype.render = function (canvas, properties) {
            console.info("Fly render");
        };
        return Fly;
    })(base.BaseVisualizer);
    exports.Fly = Fly;
});
//@ sourceMappingURL=fly.js.map
