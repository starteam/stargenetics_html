define(["require", "exports"], function(require, exports) {
    

    var Smiley = (function () {
        function Smiley() {
            this.smileyWidth = 75;
            this.smileyHeight = 75;
            this.bodyRadius = .8;
        }
        Smiley.prototype.prepare = function (canvas) {
            canvas.setAttribute('width', '' + this.smileyWidth);
            canvas.setAttribute('height', '' + this.smileyHeight);
            var context = canvas.getContext("2d");
            context.save();
            context.scale(this.smileyWidth / 4, this.smileyHeight / 4);
            context.translate(1, 1);
            return context;
        };

        Smiley.prototype.commit = function (context) {
            context.restore();
        };

        Smiley.prototype.render = function (canvas, properties) {
            console.info("Smiley render ");
            console.info(canvas);
            console.info(properties);

            var context = this.prepare(canvas);
            this.clearImage(context);
            this.drawBody(context, properties);
            this.drawEyes(context, properties);
            this.drawMouth(context, properties);

            this.commit(context);
            console.info("Smiley render done");
        };

        Smiley.prototype.clearImage = function (context) {
            context.clearRect(-1, -1, 1, 1);
        };

        Smiley.prototype.drawBody = function (context, properties) {
            context.beginPath();
            context.arc(0, 0, this.bodyRadius, 0, 2 * Math.PI, false);
            context.fillStyle = properties['bodycolor'].value;
            context.fill();
            context.closePath();
        };

        Smiley.prototype.drawEyes = function (context, properties) {
            var x0 = this.bodyRadius * .4;
            var y0 = this.bodyRadius * .2;
            var r = this.bodyRadius * .2;
            context.beginPath();
            context.arc(-x0, -y0, r, 0, 2 * Math.PI, false);
            context.arc(+x0, -y0, r, 0, 2 * Math.PI, false);
            context.fillStyle = 'black';
            context.fill();
            context.closePath();
        };

        Smiley.prototype.drawMouth = function (context, properties) {
            if (properties['mouth'].value == 'happy') {
                this.drawMouthHappy(context, properties);
            } else if (properties['mouth'].value == 'sad') {
                this.drawMouthSad(context, properties);
            } else {
                this.drawMouthNeutral(context, properties);
            }
        };

        Smiley.prototype.drawMouthNeutral = function (context, properties) {
            var d = .5;
            var x0 = this.bodyRadius * d;
            var y0 = this.bodyRadius * d;
            var r = this.bodyRadius * .2;
            context.beginPath();
            context.fillRect(-x0, y0, 2 * x0, y0 * .2);
            context.fill();
            context.closePath();
        };

        Smiley.prototype.drawMouthHappy = function (context, properties) {
            var d = .5;
            var x0 = this.bodyRadius * d;
            var y0 = this.bodyRadius * d;
            var r = this.bodyRadius * .05;
            context.beginPath();
            context.fillRect(-x0, y0, 2 * x0, y0 * .2);
            context.fillRect(-x0, y0, r, -y0 * .4);
            context.fillRect(x0 - r, y0, r, -y0 * .4);
            context.fill();
            context.closePath();
        };

        Smiley.prototype.drawMouthSad = function (context, properties) {
            var d = .5;
            var x0 = this.bodyRadius * d;
            var y0 = this.bodyRadius * d;
            var r = this.bodyRadius * .05;
            context.beginPath();
            context.fillRect(-x0, y0, 2 * x0, y0 * .2);
            context.fillRect(-x0, y0, r, y0 * .4);
            context.fillRect(x0, y0, r, y0 * .4);
            context.fill();
            context.closePath();
        };
        return Smiley;
    })();
    exports.Smiley = Smiley;
});
//@ sourceMappingURL=smiley.js.map
