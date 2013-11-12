/// <reference path="base.ts" />
import base = require("StarGenetics/visualizers/base");

export class Fly extends base.BaseVisualizer implements base.Visualizer {

    render(canvas:HTMLCanvasElement, properties:any)
    {
        console.info( "Fly render");
    }
}