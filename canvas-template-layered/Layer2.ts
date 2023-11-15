
class Layer2{
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _canvasWidth: number;
    private _canvasHeight: number;
    private _mouseX: number = 0;
    private _mouseY: number = 0;
    private _fps = 120; //set layer fps 

    constructor(canvasId: string){
        this._canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        this._canvasWidth = this._canvas.width;
        this._canvasHeight = this._canvas.height;
        this._context = this._canvas.getContext('2d', {willReadFrequently: true});
    }


    public setup(){
        //
    }
 
    //loop code
    public loop(){
        this.clearCanvas();
        // 
        this._context.strokeStyle = 'red';
        this.circle(this._mouseX + 10, this._mouseY, 10);
    }

    //events
    public mouseMoved(evt: MouseEvent){
        this._mouseX = evt.x;
        this._mouseY = evt.y;
    }


    //functions
    clearCanvas(){
        this._context.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
    }

    circle(x: number, y: number, radius: number){     
        this._context.beginPath(); 
        this._context.arc(x, y, radius, 0, 2* Math.PI);        
        this._context.closePath();
        this._context.stroke();
    }
}

