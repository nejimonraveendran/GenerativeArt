let _mainLayerCanvasId = 'mainLayer';
let _mainLayer: MainLayer;
//let _layer2: Layer2;
let _fps = 120;

window.addEventListener('load', () => {
    _mainLayer = new MainLayer(_mainLayerCanvasId); 
    _mainLayer.setup();

    // _layer2 = new Layer2('layer2');
    // _layer2.setup();

    animate();
});

 window.addEventListener('resize', () => {
    _mainLayer = new MainLayer(_mainLayerCanvasId);
    //_layer2 = new Layer2('layer2');
});

window.addEventListener('mousemove', (evt) => {
    _mainLayer.mouseMoved(evt);
    //_layer2.mouseMoved(evt);
});

function animate(){
    _mainLayer.loop();
    //_layer2.loop();

    setTimeout(() => {
        requestAnimationFrame(animate);
    }, 1000/_fps);
}