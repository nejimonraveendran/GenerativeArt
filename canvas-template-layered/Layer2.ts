
class Layer2{
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _canvasWidth: number;
    private _canvasHeight: number;
    private _mouseX: number = 0;
    private _mouseY: number = 0;
    private _fps = 120;
 
    constructor(canvasId: string){
        this._canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        this._canvasWidth = this._canvas.width;
        this._canvasHeight = this._canvas.height;
        this._context = this._canvas.getContext('2d', {willReadFrequently: true});
    }

    //loop code
    private _x = 0;
    private loop(){
        this.clearCanvas();


        //dont change this code:
        setTimeout(() => {
            requestAnimationFrame(() => this.loop());
        }, 1000/this._fps);
    }

    //functions
    private clearCanvas(){
        this._context.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
    }

}

