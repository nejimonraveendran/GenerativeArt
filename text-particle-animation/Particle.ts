class Particle{
    private drawing: Drawing;
    private canvasContext: CanvasRenderingContext2D;
    private originX: number
    private originY: number;
    private currentX: number
    private currentY: number;
    private size: number;
    private color: string;
    private proximity: number;
    private speed: number;

    private dx: number;
    private dy: number;
    private vx: number;
    private vy: number;
    private angle: number;
    private distance: number;
    private force: number;
    private friction: number;
    private ease: number;


    constructor(drawing: Drawing, x: number, y: number, size: number, color: string){
        this.drawing = drawing;
        this.canvasContext = this.drawing.canvasContext;
        this.currentX = Math.random() * this.canvasContext.canvas.width;
        this.currentY = Math.random() * this.canvasContext.canvas.height;
        this.originX = x;
        this.originY = y;
        this.size = size;
        this.color = color;
        this.speed = Math.random() * 0.1;
        this.proximity = Math.random() * 0.5 + 0.15;

        //try
        this.friction = Math.random() * 0.01;
        this.ease = Math.random() * 0.1

        this.dx = 0;
        this.dy = 0;
        this.distance = 0;
        this.drawing.pointer.x = 0;
        this.drawing.pointer.y = 0;
    }

    public update(): void{
        if(this.proximity < 0.4){
            this.proximity -= 0.0003;
        }else{
            this.proximity += 0.0003;
        }

        this.dx = this.drawing.pointer.x - this.currentX;
        this.dy = this.drawing.pointer.y - this.currentY;
        this.distance = this.dx * this.dx + this.dy * this.dy;
        this.force = -this.drawing.pointer.radius / this.distance;

        

        if(this.distance < this.drawing.pointer.radius){
            this.angle = Math.atan2(this.dy, this.dx);
            this.vx = this.force * Math.cos(this.angle);
            this.vy = this.force * Math.sin(this.angle);
        }

        this.currentX += (this.vx *= this.friction) + (this.originX - this.currentX) * this.ease * this.proximity;
        this.currentY += (this.vy *= this.friction) + (this.originY - this.currentY) * this.ease * this.proximity ;

        // this.currentX = this.currentX + (this.originX - this.currentX) * this.speed * this.proximity;
        // this.currentY = this.currentY + (this.originY - this.currentY) * this.speed * this.proximity;
    }

    public draw(){
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.fillRect(this.currentX, this.currentY, this.size, this.size);
    }
}