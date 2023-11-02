
window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    canvas.width =  window.innerWidth;
    canvas.height =  window.innerHeight;
    
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext('2d');

    // const text = "Hello, this is a test of line fit";
    // const textX = canvas.width/2;
    // const textY = canvas.height/2;
    // const textHeight = 100;  //150 is the font size set above.
    // const lineWidth = textHeight / 40;

    // ctx.textAlign = 'center';
    // ctx.textBaseline = 'middle'; //alphabetic, top, bottom, middle
    // ctx.lineWidth = lineWidth;
    // ctx.fillStyle = 'white';

    // ctx.font =  textHeight + 'px Helvetica';
    // ctx.strokeStyle = 'orange';
    
    
    

    function wrapText(text){
        var words = text.split(' ');
    
        let linesArray = [];
        let lineCounter = 0;
        let line = '';

        for (let i = 0; i < words.length; i++) {
            let testLine = line + words[i] + ' ';
            
            var textWidth = ctx.measureText(testLine).width;

            if(textWidth > maxTextWidth){
                line = words[i] + ' ';
                lineCounter++;
            } else  {
                line = testLine;
            }

            linesArray[lineCounter] = line;

        }

        let totalTextHeight = linesArray.length * textHeight;
        let textStartY = (canvas.height/2 - totalTextHeight/2); 

        linesArray.forEach((line, index) => {
            ctx.fillText(line, canvas.width/2,  textStartY + index * textHeight);
            ctx.strokeText(line, canvas.width/2, textStartY + index * textHeight);    
        });
    }

    const effect = new Effect(ctx, canvas.width, canvas.height);
    effect.wrapText("Hello");
    effect.convertToParticles();

    function animate(){

    }

});

