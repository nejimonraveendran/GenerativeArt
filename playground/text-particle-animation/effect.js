
class Effect{
    constructor(context, canvasWidth, canvasHeight){
        /** @type {CanvasRenderingContext2D} */
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.textX = this.canvasWidth / 2;
        this.textY = this.canvasHeight / 2;
        this.fontSize = 200;
        this.maxTextWidth = this.canvasWidth * 0.5;
        this.lineHeight = this.fontSize * 0.8;
        
        this.particles = [];
        this.gap = 3;

        this.mouse = {
            radius: 20000,
            x: 0,
            y: 0
        };

        window.addEventListener('mousemove', e => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
    }

    wrapText(text){    
        const gradient = this.context.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
        gradient.addColorStop(0.3, 'red');
        gradient.addColorStop(0.5, 'fuchsia');
        gradient.addColorStop(0.7, 'purple');

        const lineWidth = this.fontSize / 40;
        this.context.font =  this.fontSize + 'px Helvetica';
        this.context.fillStyle = gradient;
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle'; //alphabetic, top, bottom, middle
        this.context.lineWidth = lineWidth;
        this.context.strokeStyle = 'white';
        
        let linesArray = [];
        let words = text.split(' ');
        let lineCounter = 0;
        let line = '';

        for (let i = 0; i < words.length; i++){ 
            let testLine = line + words[i] + ' ';
            let curLineWidth = this.context.measureText(testLine).width;
            if(curLineWidth  > this.maxTextWidth){
                line = words[i] + ' ';
                lineCounter++;
            } else{
                line = testLine;
            }

            linesArray[lineCounter] = line;
        }

        let totalTextHeight = lineCounter * this.fontSize;
        let textStartY = (this.canvasHeight / 2 - totalTextHeight / 2); 

        linesArray.forEach((curLine, index) => {
            this.context.fillText(curLine, this.canvasWidth / 2,  textStartY + index * this.fontSize);
            this.context.strokeText(curLine, this.canvasWidth / 2, textStartY + index * this.fontSize);    
        });

    }

    
    convertToParticles(){

        this.particles = [];
        let pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;

        for (let y = 0; y < this.canvasHeight; y += this.gap) {
            for (let x = 0; x < this.canvasWidth; x += this.gap) {
                const curPixelIndex = (y * this.canvasWidth + x) * 4;
                const alpha = pixels[curPixelIndex + 3];

                if(alpha > 0){
                    const red = pixels[curPixelIndex + 0];
                    const green = pixels[curPixelIndex + 1];
                    const blue = pixels[curPixelIndex + 2];
                    const color = 'rgb(' + red + ',' + blue + ',' + green + ')';
                }

            }    
        }


        //console.log(pixels);
        //console.log(found);
         
    }

    render(){

    }
}
