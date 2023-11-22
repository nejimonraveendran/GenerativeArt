class Drawing{
    public canvasContext: CanvasRenderingContext2D;
    public pointer: Pointer; 

    constructor(canvasContext: CanvasRenderingContext2D){
        this.canvasContext = canvasContext;
        this.pointer = new Pointer ();
    }

    public clearCanvas(){
        this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
    }

    public drawText(text: string){
        const gradient = this.canvasContext.createLinearGradient(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
        gradient.addColorStop(0.3, 'yellow');
        gradient.addColorStop(0.6, 'red');
        gradient.addColorStop(0.9, 'yellow');

        
        
        const maxTextWidth = this.canvasContext.canvas.width * 0.5;
        
        this.canvasContext.fillStyle = gradient;
        this.canvasContext.textAlign = 'center';
        this.canvasContext.textBaseline = 'alphabetic'; //alphabetic, top, bottom, middle
        this.canvasContext.strokeStyle = 'white';

        const linesArray: string[] = [];
        const words = text.split(' ');
        let lineCounter = 0;
        let line = '';

        let fontSize;

        if(this.canvasContext.canvas.width >= this.canvasContext.canvas.height){
            fontSize = words.length > 1 ? this.canvasContext.canvas.height * 0.2 : this.canvasContext.canvas.height * 0.25;
        }else{
            fontSize = words.length > 1 ? this.canvasContext.canvas.width * 0.2 : this.canvasContext.canvas.width * 0.25;
        }

        const lineWidth = fontSize / 75;
        this.canvasContext.font =  fontSize + 'px Helvetica';
        this.canvasContext.lineWidth = lineWidth;
        

        for (let i = 0; i < words.length; i++){ 
            const curLine = line + words[i] + ' ';
            const curLineWidth = this.canvasContext.measureText(curLine).width;
            if(curLineWidth  > maxTextWidth){
                line = words[i] + ' ';
                lineCounter++;
            } else{
                line = curLine;
            }

            linesArray[lineCounter] = line;
        }

        const totalTextHeight = lineCounter * fontSize;
        const textStartY = (this.canvasContext.canvas.height / 2 - totalTextHeight / 2); 

        linesArray.forEach((curLine, index) => {
            this.canvasContext.fillText(curLine, this.canvasContext.canvas.width / 2,  textStartY + index * fontSize);
            this.canvasContext.strokeText(curLine, this.canvasContext.canvas.width / 2, textStartY + index * fontSize);    
        });        
    }

    public convertDrawingToParticles() : Particle[]{
        const particlesArray: Particle[] = [];
        const pixels = this.canvasContext.getImageData(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height).data;

        let pixelScanningSize;

        if(this.canvasContext.canvas.width <= this.canvasContext.canvas.height){
            pixelScanningSize =  Math.floor(this.canvasContext.canvas.width / 300);
        }else{
            pixelScanningSize =  Math.floor(this.canvasContext.canvas.height / 300);            
        }


        for (let y = 0; y < this.canvasContext.canvas.height; y+=pixelScanningSize) {
            for (let x = 0; x < this.canvasContext.canvas.width; x+=pixelScanningSize) {
                const curPixelIndex = (y * this.canvasContext.canvas.width + x) * 4;
                const alpha = pixels[curPixelIndex + 3];

                if(alpha > 0){
                    const red = pixels[curPixelIndex + 0];
                    const green = pixels[curPixelIndex + 1];
                    const blue = pixels[curPixelIndex + 2];
                    const color = 'rgb(' + red + ',' + green + ',' + blue + ')';

                    particlesArray.push(new Particle(this, x, y, pixelScanningSize, color));
                }
            }    
            
        }

        return particlesArray;    
    }

    public drawWaterMarks(text: string){
        let fontSize;

        if(this.canvasContext.canvas.width >= this.canvasContext.canvas.height){
            fontSize = this.canvasContext.canvas.height * 0.1;
        }else{
            fontSize = this.canvasContext.canvas.width * 0.1;
        }
        
        this.canvasContext.font =  fontSize + 'px Helvetica';
         
        this.canvasContext.fillStyle = 'rgb(255, 255, 255, 0.1)'; 
        
        const textWidth = this.canvasContext.measureText(text).width
        
        let x =  this.canvasContext.canvas.width * 0.1 + textWidth/2;
        let y =  this.canvasContext.canvas.height * 0.2; 
        this.canvasContext.fillText(text, x, y);

        x =  this.canvasContext.canvas.width - textWidth;
        y =  this.canvasContext.canvas.height - fontSize; 
        this.canvasContext.fillText(text, x, y);

    }

}

