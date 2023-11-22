
class MainLayer{
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _canvasWidth: number;
    private _canvasHeight: number;
    private _prevFrameTime = Date.now();
    private _fps = 30;

    public animationId: number = 0;
    public pixelScanningsize = 2;
    public particles: Particle[]; 
    public context: CanvasRenderingContext2D;
    public height: number;

    constructor(canvasId: string){
        this._canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        this._canvasWidth = this._canvas.width;
        this._canvasHeight = this._canvas.height;
        this._context = this._canvas.getContext('2d', {willReadFrequently: true});
        this.context = this._context;
        this.height = this._canvasHeight;
        
        this.loadImageAndProcess("cat.png");

        //on this event, , 
        this._canvas.onmousemove = (e) => {
            if(e.buttons != 1) //if left button down
                return;
            
            this.applyEffect(e.x, e.y);
        }

        window.addEventListener('touchmove', (e) => {
            let touch = e.touches[0];
            if(touch == null || touch == undefined){
                return;
            }

            this.applyEffect(touch.clientX, touch.clientY);
        });
    }


    private applyEffect(pointerX, pointerY){
        //scan the particles around the current mouse position.  The effect will be applied to these particles.
        for (let i = 0; i < this.particles.length; i++){    
            let scanRadius = Math.random() * 20 + 5; //scan radius is determined by this setting.

            if((this.particles[i].originalX >= pointerX - scanRadius && this.particles[i].originalX <= pointerX + scanRadius) && 
                (this.particles[i].originalY >= pointerY - scanRadius && this.particles[i].originalY <= pointerY + scanRadius)){    
                    let particle: Particle;
                    particle = this.particles[i];
                    particle.velocityY = Math.random() * 10 + 0.5; //change vertical velocity of the particle in the scan radius range                        
            }
        }
    }
    

    public loadImageAndProcess(image: string | ArrayBuffer){
        let img = new Image();
        
        img.onload = (evt) => {
            if(this.animationId != 0){
                cancelAnimationFrame(this.animationId);
            }

            this.clearCanvas();
            this.particles = [];
            this.drawImage(img);      
            this.convertToParticles();
            this.clearCanvas();
            this.renderParticles();
            //start animation loop
            this.loop();
        } 
        
        img.src = <string>image;

    }

    //loop code
    private loop(){
        let elapsed = Date.now() - this._prevFrameTime;

        if(elapsed > 1000/this._fps){
            this._prevFrameTime = Date.now();

            this.clearCanvas();
            this.renderParticles();
        }

        //do not change the below code:
       this.animationId = requestAnimationFrame(() => this.loop());        
    }

   
    //functions
    private drawImage(img){
        let wRatio = this._canvasWidth / img.naturalWidth;
        let hRatio = this._canvasHeight / img.naturalHeight;

        let scaleFactor = 1;
        if(img.naturalWidth <= 500 || img.naturalHeight <= 500){
            scaleFactor = 1;
        }else if (img.naturalWidth <= 1000 || img.naturalHeight <= 1000){
            scaleFactor = 0.5;
        }else{
            scaleFactor = 0.25;
        }

        var ratio = Math.max(hRatio, wRatio) * scaleFactor; //change the multiplier to change the scale
        let left = (this._canvasWidth - img.naturalWidth * ratio) / 2;
        let top = (this._canvasHeight - img.naturalHeight * ratio) / 2;
        this._context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, left, top, img.width * ratio, img.height * ratio);
    }

    private convertToParticles(){
        let imageData = this._context.getImageData(0, 0, this._canvasWidth, this._canvasHeight).data;

        for (let y = 0; y < this._canvas.height; y+=this.pixelScanningsize) {
            for (let x = 0; x < this._canvas.width; x+=this.pixelScanningsize) {
                let curPixelIndex = (y * this._canvasWidth + x) * 4;
                let alpha = imageData[curPixelIndex];

                if(alpha > 0){ 
                    let r = imageData[curPixelIndex];
                    let g = imageData[curPixelIndex+1];
                    let b = imageData[curPixelIndex+2];
                    let color = `rgb(${r},${g},${b})`;
                    let p = new Particle(this, x, y, color);
                    this.particles.push(p);
                }
            }    
        }
    }

    private renderParticles(){
        this.particles.forEach((particle, i) => {
            particle.update();
            particle.draw();

            //optional: if off canvas, remove particle. 
            if(particle.isOffCanvas()){
                this.particles.splice(i, 1);
            }
        });
    }

    private clearCanvas(){
        this._context.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
    }

    private circle(x: number, y: number, radius: number){     
        this._context.beginPath(); 
        this._context.arc(x, y, radius, 0, 2* Math.PI);        
        this._context.closePath();
        this._context.stroke();
    }
}


class Particle{
    private _layer: MainLayer;

    public originalX: number = 0;
    public originalY: number = 0;
    public currentX: number = 0;
    public currentY: number = 0;
    public velocityX: number = 0;
    public velocityY: number = 0;
    public color: string;
    public angle: number = 0;
    public rotationRadius: number = 0;
    public size: number;

    constructor(layer: MainLayer, originalX: number, originalY: number, color: string){
        this._layer = layer;

        this.originalX = originalX;
        this.originalY = originalY;
        this.currentX = this.originalX;  
        this.currentY = this.originalY; 
        //this.velocityX = Math.random() * 1 + 0.01;
        this.velocityY = 0; //set initial velocity to 0 (to keep the particle vertically stationary).
        this.angle = Math.random() * (Math.PI * 2); //set angle of rotation of current particle to a random value between 0 and 360 degrees
        this.rotationRadius = Math.random() * 1; //rotation trajectory of current particle
        this.color = color; 
        this.size = this._layer.pixelScanningsize;
    }


    update(){
        //as soon as the vertical position changes from original position, start applying oscillating movement in the x axis
        if(this.currentY > this.originalY){ 
            this.currentX += Math.cos(this.angle) * this.rotationRadius;
            this.angle += 0.01; //optional: start changing the angle for more wandering particle effect
        }
   
        //constantly move the particle down
        this.currentY += this.velocityY;
     }

    draw(){
        this._layer.context.fillStyle = this.color;
        this._layer.context.fillRect(this.currentX, this.currentY, this.size, this.size);
    }

    isOffCanvas(){
        return this.currentY > this._layer.height;
    }
}

