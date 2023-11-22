let _mainLayerCanvasId = 'mainLayer';
let _mainLayer: MainLayer;

window.addEventListener('load', () => {
    _mainLayer = new MainLayer(_mainLayerCanvasId); 
    setupFileDialog();
});

window.addEventListener('resize', () => {
    cancelAnimationFrame(_mainLayer.animationId);
    _mainLayer = new MainLayer(_mainLayerCanvasId);
});


function setupFileDialog(){
    let fileDlg = document.getElementById("file");
    fileDlg.onchange = (e: Event) =>{
        let file = (<HTMLInputElement>e.target).files[0];

        if(file === undefined || file == null)
            return;
        
        var reader = new FileReader();
        reader.onload = (re) =>{
            _mainLayer.loadImageAndProcess(re.target.result);
        };

        reader.readAsDataURL(file);
    }

    let btnFile = document.getElementById("btnFile");
    btnFile.onclick = () =>{
        fileDlg.click();
    }
}



