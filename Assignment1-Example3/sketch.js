function setup() {
  createCanvas(400, 200);
  noStroke();
 
}

function draw() {
  background(0);

  fill(242, 234, 5); 
  arc(100, 100, 150, 150, radians(230), radians(500), PIE);

  fill(255, 0, 0); 
  let ghostX = 220; 
  let ghostY = 100; 
  let ghostWidth = 150; 
  let ghostHeight = 75; 
  let arcHeight = ghostWidth; 

  rect(ghostX, ghostY, ghostWidth, ghostHeight); 
  
  arc(ghostX + ghostWidth / 2, ghostY, ghostWidth, arcHeight, PI, TWO_PI, CHORD);


  fill(255, 255, 255); 
  circle(260,100,50);
  
  fill(255, 255, 255); 
  circle(330,100,50);

  fill(0, 0, 255); 
  circle(260,100,30);
  
  fill(0, 0, 255); 
  circle(330,100,30);
 
}
