
let currentColor;
let red, orange, yellow, green, cyan, blue, purple, brown, white, black;

function setup() {
  createCanvas(1200, 600);
  background(255);

currentColor = "black";
red = new ColorBox(0,"red");
orange = new ColorBox(50,"orange");
yellow = new ColorBox(100,"yellow");
green = new ColorBox(150,"green");
cyan = new ColorBox(200,"cyan");
blue = new ColorBox(250,"blue");
purple = new ColorBox(300,"purple");
brown = new ColorBox(350,"brown");
white = new ColorBox(400,"white");
black = new ColorBox(450,"black");
}

function draw()  {

if(mouseIsPressed){
  if(mouseX >51){
    drawing();

}
}

red.appear();
orange.appear();
yellow.appear();
green.appear();
cyan.appear();
blue.appear();
purple.appear();
brown.appear();
white.appear();
black.appear();

}

class ColorBox {
constructor(y, color){
this.x= 0;
this.y=y;
this.w=50;
this.h=50;
this.color = color;
}

appear(){
  push();

  if(this.color !== "white"){
    noStroke();
  }
  fill(this.color);
  rect(this.x,this.y,this.w,this.h);
  pop();
}
onMousePressed() {
    if (mouseX < 50) {
      if (mouseY > this.y && mouseY < this.y + this.h) {
        currentColor = this.color;
      }
    }
  }
}


function mousePressed() {
red.onMousePressed();
orange.onMousePressed();
yellow.onMousePressed();
green.onMousePressed();
cyan.onMousePressed();
blue.onMousePressed();
purple.onMousePressed();
brown.onMousePressed();
white.onMousePressed();
black.onMousePressed();
}


function drawing(){
  push();
stroke(currentColor);
strokeWeight(5);
line(pmouseX,pmouseY,mouseX,mouseY);
pop();
}



