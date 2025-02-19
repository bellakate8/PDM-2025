let GameStates = Object.freeze({ 
  START: "start",
  PLAY: "play",
  END: "end"
});

let gameState = GameStates.START;
let score = 0;
let highScore = 0;
let time = 30;
let textPadding = 15;
let gameFont;
let bluebug;
let frameWidth, frameHeight;
let bugFrames = [];
let squishFrame;
let bugs = [];
let speedIncrease = 0;
let spawnTimer = 0;
let spawnInterval = 1500; 
let maxBugs = 40; 

function preload() {
  gameFont = loadFont("Media/PressStart2P-Regular.ttf");
  bluebug = loadImage("Media/New Piskel.png"); 
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  textFont(gameFont);

  frameWidth = bluebug.width / 8; 
  frameHeight = bluebug.height;

  for (let i = 0; i < 7; i++) {
    bugFrames.push(bluebug.get(i * frameWidth, 0, frameWidth, frameHeight));
  }
  squishFrame = bluebug.get(7 * frameWidth, 0, frameWidth, frameHeight);

  resetGame();
}

function draw() {
  background(220);

  switch (gameState) {
    case GameStates.START:
      textAlign(CENTER, CENTER);
      textSize(18);
      text("Press ENTER to Start", width / 2, height / 2);
      break;
    case GameStates.PLAY:
      textAlign(LEFT, TOP);
      text("Score: " + score, textPadding, textPadding);
      textAlign(RIGHT, TOP);
      text("Time: " + Math.ceil(time), width - textPadding, textPadding);

      time -= deltaTime / 1000;
      if (time <= 0) {
        gameState = GameStates.END;
      }

      
      for (let bug of bugs) {
        bug.update();
        bug.show();
      }

      
      if (bugs.length < maxBugs && millis() - spawnTimer > spawnInterval) {
        bugs.push(new Bug(random(80, width - 80), random(80, height - 80)));
        spawnTimer = millis();
      }
      break;
    case GameStates.END:
      textAlign(CENTER, CENTER);
      text("Game Over!", width / 2, height / 2 - 20);
      text("Score: " + score, width / 2, height / 2);
      if (score > highScore) highScore = score;
      text("High Score: " + highScore, width / 2, height / 2 + 20);
      break;
  }
}

function keyPressed() {
  if (keyCode === ENTER && (gameState === GameStates.START || gameState === GameStates.END)) {
    gameState = GameStates.PLAY;
    score = 0;
    time = 30;
    speedIncrease = 0;
    resetGame();
  }
}


class Bug {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 2 + speedIncrease; 
    this.currentFrame = 0;
    this.isSquished = false;
    this.frameTimer = 0;
    
    this.direction = random() < 0.25 ? 1 : random() < 0.5 ? -1 : random() < 0.75 ? 2 : -2; 
  }

  update() {
    if (!this.isSquished) {
      if (millis() - this.frameTimer > 100) {
        this.currentFrame = (this.currentFrame + 1) % bugFrames.length;
        this.frameTimer = millis();
      }

      
      if (this.direction === 1) {
      // right
        this.x += this.speed;
        if (this.x > width) this.x = -frameWidth;
      } else if (this.direction === -1) {
        // left
        this.x -= this.speed;
        if (this.x < -frameWidth) this.x = width;
      } else if (this.direction === 2) {
        //  up
        this.y -= this.speed;
        if (this.y < -frameHeight) this.y = height;
      } else if (this.direction === -2) {
        //  down
        this.y += this.speed;
        if (this.y > height) this.y = -frameHeight;
      }
    }
  }

  show() {
    push();
    translate(this.x, this.y);

    
    if (this.direction === 1) {
      rotate(0); //  right
    } else if (this.direction === -1) {
      rotate(PI); // left
    } else if (this.direction === 2) {
      rotate(-HALF_PI); //  up
    } else if (this.direction === -2) {
      rotate(HALF_PI); // down
    }

    
    if (this.isSquished) {
      image(squishFrame, 0, 0, frameWidth, frameHeight);
    } else {
      image(bugFrames[this.currentFrame], 0, 0, frameWidth, frameHeight);
    }

    pop();
  }

  squish() {
    if (!this.isSquished) {
      this.isSquished = true;
      score++;
      speedIncrease += 0.3;

      
      for (let bug of bugs) {
        if (!bug.isSquished) {
          bug.speed = 2 + speedIncrease;
        }
      }
    }
  }
}


function resetGame() {
  bugs = [];
  for (let i = 0; i < 5; i++) {
    bugs.push(new Bug(random(80, width - 80), random(80, height - 80)));
  }
  spawnTimer = millis();
}


function mousePressed() {
  for (let bug of bugs) {
    let d = dist(mouseX, mouseY, bug.x, bug.y);
    if (d < frameWidth / 2) {
      bug.squish();
    }
  }
}

