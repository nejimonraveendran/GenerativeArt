
let canvas: HTMLCanvasElement;
let canvasContext: CanvasRenderingContext2D;
let drawing: Drawing;
let particles: Particle[];
let animationId: number = 0;
let text = 'KARMA';
const fps = 30;

window.addEventListener('load', () => {
    setupControls();
    setup();
});

window.addEventListener('resize', () => {
    setup();
});

window.addEventListener('mousemove', (evt) => {
    drawing.pointer.x = evt.x;
    drawing.pointer.y = evt.y;
    drawing.pointer.radius = Math.random() * 1000 + 5000000;
});

window.addEventListener('touchmove', (evt) => {
    for (let i = 0; i < evt.touches.length; i++) {
        drawing.pointer.x = evt.touches[i].clientX;
        drawing.pointer.y = evt.touches[i].clientY;
        drawing.pointer.radius =  Math.random() * 1000 + 5000000;                
    } 
});


function setupControls(){
    let btn = document.getElementById("btnGo");
    let txt = <HTMLInputElement>document.getElementById("txtText");

    btn.onclick = () =>{
        if(txt.value == null || txt.value == undefined || txt.value == ''){
            return;
        }

        text = txt.value;
        setup();
    };
}

function setup(){ 
    if(animationId > 0){
        cancelAnimationFrame(animationId);
    }

    particles = [];
    const urlParams = new URLSearchParams(window.location.search);
    const inputText = urlParams.get('text');
    const inputFps = urlParams.get('fps');

    this.text = inputText == null ? text : inputText;
    this.fps = inputFps == null ? fps : inputFps;

    canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvasContext = canvas.getContext('2d', {willReadFrequently: true});

    drawing = new Drawing(canvasContext);
    drawing.drawText(text);
    particles = drawing.convertDrawingToParticles();

    animate();
}

let prevFrameTime = Date.now();
function animate(){
    let elapsed = Date.now() - prevFrameTime;

    if(elapsed > 1000/fps){
        this._prevFrameTime = Date.now();
    
        drawing.clearCanvas();
  
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
    
    }

    this.animationId = requestAnimationFrame(animate);
}


// private loop(){
//     let elapsed = Date.now() - this._prevFrameTime;

//     if(elapsed > 1000/this._fps){
//         this._prevFrameTime = Date.now();

//         this.clearCanvas();
//         this.renderParticles();
//     }

//     //do not change the below code:
//    this.animationId = requestAnimationFrame(() => this.loop());        
// }
