let _mainLayerCanvasId = 'mainLayer';
let _mainLayer: MainLayer;
//let _layer2: Layer2;

window.addEventListener('load', () => {
    _mainLayer = new MainLayer(_mainLayerCanvasId); 
    //_layer2 = new Layer2('layer2');
});

 window.addEventListener('resize', () => {
    _mainLayer = new MainLayer(_mainLayerCanvasId);
    //_layer2 = new Layer2('layer2');
});
