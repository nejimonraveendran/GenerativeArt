let _mainLayerCanvasId = 'mainLayer';
let _mainLayer: MainLayer
let _fps = 120;

window.addEventListener('load', () => {
    _mainLayer = new MainLayer(_mainLayerCanvasId); 
    _mainLayer.setup();
    animate();
});

 window.addEventListener('resize', () => {
    _mainLayer = new MainLayer(_mainLayerCanvasId);
});

window.addEventListener('mousemove', (evt) => {
    _mainLayer.mouseMoved(evt);
});

function animate(){
    _mainLayer.loop();

    setTimeout(() => {
        requestAnimationFrame(animate);
    }, 1000/_fps);
}