export class Smiley {
    smileyWidth = 75;
    smileyHeight = 75;

    bodyRadius:number = .8;

    prepare(canvas:HTMLCanvasElement):CanvasRenderingContext2D {

        canvas.setAttribute('width', '' + this.smileyWidth);
        canvas.setAttribute('height', '' + this.smileyHeight);
        var context = canvas.getContext("2d");
        context.save();
        context.scale(this.smileyWidth / 4, this.smileyHeight / 4);
        context.translate(1, 1);
        return context;
    }

    commit(context) {
        //context.commit();
        context.restore();

    }

    render(canvas:HTMLCanvasElement, properties:any) {
        console.info("Smiley render ");
        console.info(canvas);
        console.info(properties);

        var context = this.prepare(canvas);
        this.clearImage(context);
        this.drawBody(context, properties);
        this.drawEyes(context, properties);
        this.drawMouth(context, properties);
//        this.drawSterile(context,properties);
//        this.drawMatings(context,properties);
        this.commit(context);
        console.info("Smiley render done");

    }

    clearImage(context:CanvasRenderingContext2D) {
        context.clearRect(-1, -1, 1, 1);
    }

    drawBody(context:CanvasRenderingContext2D, properties:any) {
        context.beginPath();
        context.arc(0, 0, this.bodyRadius, 0, 2 * Math.PI, false);
        context.fillStyle = properties['bodycolor'].value;
        context.fill();
        context.closePath();
    }

    drawEyes(context:CanvasRenderingContext2D, properties:any) {
        var x0 = this.bodyRadius * .4;
        var y0 = this.bodyRadius * .2;
        var r = this.bodyRadius * .2
        context.beginPath();
        context.arc(-x0, -y0, r, 0, 2 * Math.PI, false);
        context.arc(+x0, -y0, r, 0, 2 * Math.PI, false);
        context.fillStyle = 'black';
        context.fill();
        context.closePath();

    }

    drawMouth(context:CanvasRenderingContext2D, properties:any) {
        if (properties['mouth'].value == 'happy') {
            this.drawMouthHappy(context,properties);
        }
        else if (properties['mouth'].value == 'sad') {
            this.drawMouthSad(context,properties);
        }
        else
        {
            this.drawMouthNeutral(context,properties);
        }
    }

    drawMouthNeutral(context:CanvasRenderingContext2D, properties:any) {
            var d = .5;
        var x0 = this.bodyRadius * d;
        var y0 = this.bodyRadius * d;
        var r = this.bodyRadius * .2
        context.beginPath();
        context.fillRect(-x0, y0, 2 * x0, y0 * .2);
        context.fill();
        context.closePath();
    }

    drawMouthHappy(context:CanvasRenderingContext2D, properties:any) {
            var d = .5;
        var x0 = this.bodyRadius * d;
        var y0 = this.bodyRadius * d;
        var r = this.bodyRadius * .05;
        context.beginPath();
        context.fillRect(-x0, y0, 2 * x0, y0 * .2);
        context.fillRect(-x0, y0, r , -y0 *.4 ) ;
        context.fillRect(x0-r, y0, r , -y0 *.4 ) ;
        context.fill();
        context.closePath();
    }

    drawMouthSad(context:CanvasRenderingContext2D, properties:any) {
            var d = .5;
        var x0 = this.bodyRadius * d;
        var y0 = this.bodyRadius * d;
        var r = this.bodyRadius * .05;
        context.beginPath();
        context.fillRect(-x0, y0, 2 * x0, y0 * .2);
        context.fillRect(-x0, y0, r , y0 *.4 ) ;
        context.fillRect(x0, y0, r , y0 *.4 ) ;
        context.fill();
        context.closePath();
    }

}