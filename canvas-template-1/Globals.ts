let _canvas: HTMLCanvasElement;
let _context: CanvasRenderingContext2D;
let _canvasWidth: number;
let _canvasHeight: number;
let _mouseX: number = 0;
let _mouseY: number = 0;
const _fps = 120;

//animate function
function animate(){
    loop();
    setTimeout(() => {
        requestAnimationFrame(animate);
    }, 1000/_fps);
}
