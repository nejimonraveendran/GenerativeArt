function setup() {
  //pixelDensity(1);
  //createCanvas(450, 900);
  //createCanvas(900, 600);
  //createCanvas(1200, 800);

  createCanvas(windowWidth,windowHeight-80);
  
  background(180);
  textAlign(CENTER);
  textSize(width/25);
  text('Generating, please wait...', width/2, height/2)
}

function draw() {
  background(250);
  noLoop();
  
  var stepX = width / 6;
  var stepY = height / 6;
  
  for(let x=0;x<width+100;x=x+stepX){
    for(let y=0;y<height+100;y=y+stepY){
      let xx = random(x-50, x+50);
      let yy = random(y-50, y+50);
      
      let radLow = 0;
      let radHigh = 0;
      
      if(width > height){ //reverse this, and see interesting difference
        radLow = height/6;
        radHigh = height/3;
      }else{
        radLow = width/6;
        radHigh = width/3;        
      }
      
      let clr = random(150, 320); //multi-color
      //let clr = random(300, 320); //mimosa-like color
      
      let f = new Flower(xx, yy, random(radLow,radHigh), clr);
      f.draw();
    }  
  }
  
}

class Flower{
  constructor(x, y, rad, clr){
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.clr = clr;
  }
  
  draw(){
    push();
    colorMode(HSB);
    noFill();
    translate(this.x, this.y);
    angleMode(DEGREES);
    
  
    let lc = this.rad / 4; //layer count

    //objective is to draw 4 different layers of irregular lines in circles.
    for(let lr=this.rad;lr>=lc;lr-=lc){  //calculate each layer's radius.   
            //increase saturation of strokes by each layer to produce the layer color depth
      let c = map(lr, this.rad, lc, this.clr, this.clr+50)
      let s = map(lr, this.rad, lc, 90, 100); 
      let b = map(lr, this.rad, lc, 100, 20);
      let sw = map(lr, this.rad, lc, 0.5, 0)
      let clr = color(c, s, b);
      let alpha = 0.3;
      clr.setAlpha(alpha);
      stroke(clr);  
      strokeWeight(sw);
      
      
      let degStep = map(lr, this.rad, lc, 1, 15);
      //draw lines by rotating random degrees.
      for(let a=0;a<360;a+=degStep){
        push();
        rotate(a);
        noFill();

        let r = random(lr * 0.8, lr); //random radius
        let cvs = []; //array to store curve vertices
        beginShape();
        let rs = random(r, r*0.9);
        for(let x=-5;x<rs;x+=rs/10){ //create segments for curve vertices
          let y = random(0, 5);
          cvs.push(createVector(x, y))
          curveVertex(x, y);
        }
        endShape();

        fill(255);
        let v = cvs[cvs.length-2]
        stroke(clr, 100, 50, alpha * 2);
        strokeWeight(this.rad* 0.005);
        circle(v.x, v.y, random(this.rad * 0.02, this.rad * 0.04));
        stroke(0);
        point(v.x, v.y)
        pop();
      }
    }
    
    
    pop();
  }
}