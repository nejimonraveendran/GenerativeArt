

//vs code build command: ctrl+shift+B -> tsc:watch - tsconfig.json

//called from document load event:
function setup(){
    _canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    _canvas.width = window.innerWidth;
    _canvas.height = window.innerHeight;
    _canvasWidth = _canvas.width;
    _canvasHeight = _canvas.height;
    _context = _canvas.getContext('2d', {willReadFrequently: true});
}

//write frame loop code here:
function loop(){
    clearCanvas();

    let a = -45;
    let r = 200;

    let v1 = new Vector(500, 400); //origin
    circle(v1.x, v1.y, 2, 'white');

    text("v1: x=" + v1.x.toString() + ', y=' + v1.y.toString(), 100, 80, 'white');


    let v2 = polarToCartesian(a, r);
    v2.add(v1);
    
    v2 = new Vector(_mouseX, _mouseY);

    text("v2: x=" + v2.x.toString() + ', y=' + v2.y.toString(), 100, 90, 'white');

    circle(v2.x, v2.y, 5, 'white');

    line(v1.x, v1.y, v2.x, v2.y, 'white');

    let distBetweenV1andV2 = v2.distance(v1);

    text("distance: " + distBetweenV1andV2.toString(), 100, 100, 'white');

    let v3 = v1.copy().subtract(v2);
    v3.setMagnitude(100);
    v3.limit(50);
    let v4 = v1.copy().subtract(v3);
    
    let mag = v3.magnitude();
    text("mag: " + mag.toString(), 100, 110, 'white');

    
    text("v3: x=" + v3.x.toString() + ', y=' + v3.y.toString(), 100, 120, 'white');

    //line(v1.x, v1.y, v1.x - v3.x, v1.y - v3.y, 'red');
    line(v1.x, v1.y, v4.x, v4.y, 'red');

    let v5 = v2.copy().subtract(v1);
    let plr = cartesianToPolar(v5.x, v5.y);
    text("degrees: " + plr.angleInDegrees.toString() + ", radians: " + plr.angleInRadians.toString() + ", radius: " + plr.radius.toString(), 100, 130, 'white');

    let v6 = v4.copy().subtract(v1);

    let plr2 = cartesianToPolar(v5.x, v5.y);
    text(plr2.angleInDegrees.toString(), 100, 140, 'white');

    let plr3 = cartesianToPolar(v6.x, v6.y);
    text(plr2.angleInDegrees.toString(), 100, 150, 'white');


    let angleInfo = v5.angleBetween(v6);
    text("angle between: Degrees: " + angleInfo.angleInDegrees.toString() + ", radians: " + angleInfo.angleInRadians.toString(), 100, 160, 'white');


    //console.log(v3); 

    //console.log(distBetweenV1andV2);

    //let dist = v2.distance(v1);
    //console.log(dist);


    //let plr = cartesianToPolar(600-500, 200-400);
    
    //console.log(plr);    


    
    //console.log(dist);

   // v2.subtract(v1).normalize();
    
    
    //circle(100, 100, 10, 'white');
    //code here    
}




