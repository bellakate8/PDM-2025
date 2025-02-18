let cyclops;
let greensprite;
let blueclown;
let character;
let character2;
let character3;

function preload() {
  cyclops = loadImage("cyclops.png");
  greensprite = loadImage ("greensprite.png");
  blueclown = loadImage ("blueclown.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  character = new Character(random(80, width-80),random(80, height-80));

  character.addAnimation("right", new SpriteAnimation(cyclops, 1, 0, 8,true));
  character.addAnimation("left", new SpriteAnimation(cyclops, 1, 0, 8, ));
  
  character.addAnimation("stand", new SpriteAnimation(cyclops, 0, 0, 1));
  character.currentAnimation = "stand";

  character2 = new Character(random(80, width-80),random(80, height-80));

  character2.addAnimation("right", new SpriteAnimation(greensprite, 1, 0 , 8,true));
  character2.addAnimation("left", new SpriteAnimation(greensprite, 1, 0, 8, ));
  
  character2.addAnimation("stand", new SpriteAnimation(greensprite, 0, 0, 1));
  character2.currentAnimation = "stand";

  character3 = new Character(random(80, width-80),random(80, height-80));

  character3.addAnimation("right", new SpriteAnimation(blueclown, 1, 0, 8,true));
  character3.addAnimation("left", new SpriteAnimation(blueclown, 1, 0, 8, ));
  
  character3.addAnimation("stand", new SpriteAnimation(blueclown, 0, 0, 1));
  character3.currentAnimation = "stand";
}

function draw() {
  background(220);

  character.draw();
  character2.draw();
  character3.draw();
}

function keyPressed() {
  character.keyPressed();
  character2.keyPressed();
  character3.keyPressed();
}

function keyReleased() {
  character.keyReleased();
  character2.keyReleased();
  character3.keyReleased();
}

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.currentAnimation) {
        case "right":
          this.x -= 2;
          break;
        case "left": 
          this.x += 2;
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    switch(keyCode) {
      case RIGHT_ARROW:
        this.currentAnimation = "left";
        break;
      case LEFT_ARROW:
        this.currentAnimation = "right";
        break;
    }
  }
  
  keyReleased() {
    this.currentAnimation = "stand";
    switch(keyCode) {
      case RIGHT_ARROW:
        this.animations[this.currentAnimation].flipped = false;
        
        break;

        case LEFT_ARROW:
        this.animations[this.currentAnimation].flipped = true;
       
        break;
  }
}
}
class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration, flipped=false ) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = flipped;
  }

  draw() {

    let s = (this.flipped) ? -1 : 1;
    scale(s,1);
    image(this.spritesheet, 0, 0, 80, 80, this.u*80, this.v*80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 10 === 0)
      this.u++;

    if (this.u === this.startU + this.duration)
      this.u = this.startU;
  }
}