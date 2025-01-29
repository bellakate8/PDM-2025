function setup() {
  createCanvas(400, 400);
  background(17, 13, 107);
  
  noFill();
  stroke(600);
  strokeWeight(9);
  ellipse(200, 200, 200, 200);
  
  fill(77, 156, 36);
  noStroke();
  ellipse(200, 200, 200 , 200);
  
  fill(255, 0, 0);
  noStroke();
  drawStar(200, 200, 40, 80, 5);
  
  stroke(255);
  strokeWeight(9); 
  noFill();
  drawStarOutline(200, 200, 40, 80, 5); 
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -PI / 2; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawStarOutline(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -PI / 2; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);

  
  
  fill(255, 0, 0);
  noStroke();
  drawStar(200, 200, 40, 80, 5);
}