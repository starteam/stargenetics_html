export interface Visualizer {
    render(canvas:HTMLCanvasElement, properties:any);
}

export class BaseVisualizer implements Visualizer {
    width:number = 75;
    height:number = 75;

    render(canvas:HTMLCanvasElement, properties:any) {

    }
}
