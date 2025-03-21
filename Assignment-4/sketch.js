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
let swooshPlayer, splatPlayer, electroPlayer, gameoverPlayer;
let frameWidth, frameHeight;
let bugFrames = [];
let squishFrame;
let bugs = [];
let speedIncrease = 0;
let spawnTimer = 0;
let spawnInterval = 1500;
let maxBugs = 40;
let bpmIncrement = 3.4;
let maxBpm = 2000;
let introPlaying = false;
let introButton;
let introPlayer;

function preload() {
  gameFont = loadFont("Media/PressStart2P-Regular.ttf");
  bluebug = loadImage("Media/New Piskel.png");
  swooshPlayer = new Tone.Player("Media/swoosh.mp3").toDestination();
  splatPlayer = new Tone.Player("Media/splat.mp3").toDestination();
  
  gameoverPlayer = new Tone.Player("Media/game-over-arcade-6435.mp3").toDestination();
  introPlayer = new Tone.Player("Media/electro-synth-155475.mp3").toDestination(); 
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
  

  introButton = createButton("Start Intro Music");
  introButton.position(width / 2 - 80, height / 2 + 30);
  introButton.mousePressed(startIntroMusic);





Tone.Transport.timeSignature = [4, 4];
 Tone.Transport.bpm.value = 140;










 synth1 = new Tone.PolySynth(Tone.Synth).toDestination();
 part1 = new Tone.Part((time, value) => {
   synth1.triggerAttackRelease(value.note, value.dur, time);
 }, [
   { time: 0, note: "C4", dur: "8n" },
   { time: "0:0.5", note: "D4", dur: "8n" },
   { time: "0:1", note: "F4", dur: "8n" },
   { time: "0:1.5", note: "E4", dur: "8n" },
   { time: "0:2", note: "A4", dur: "8n" },
   { time: "0:2.5", note: "G4", dur: "8n" },
   { time: "0:3", note: "F4", dur: "8n" },
   { time: "1:0", note: "C5", dur: "8n" },
   { time: "1:0.5", note: "B4", dur: "8n" },
   { time: "1:1", note: "G4", dur: "8n" },
   { time: "1:1.5", note: "F4", dur: "8n" },
   { time: "1:2", note: "E4", dur: "8n" },
   { time: "1:2.5", note: "D4", dur: "8n" },
   { time: "1:3", note: "C4", dur: "8n" },
 ]).start();


 part2 = new Tone.Part((time, value) => {
   synth1.triggerAttackRelease(value.note, value.dur, time);
 }, [
   { time: 0, note: "G3", dur: "8n" },
   { time: "0:0.5", note: "A3", dur: "8n" },
   { time: "0:1", note: "C4", dur: "8n" },
   { time: "0:1.5", note: "D4", dur: "8n" },
   { time: "0:2", note: "F4", dur: "8n" },
   { time: "0:2.5", note: "E4", dur: "8n" },
   { time: "0:3", note: "C4", dur: "8n" },
   { time: "1:0", note: "G4", dur: "8n" },
   { time: "1:0.5", note: "F4", dur: "8n" },
   { time: "1:1", note: "D4", dur: "8n" },
   { time: "1:1.5", note: "C4", dur: "8n" },
   { time: "1:2", note: "B3", dur: "8n" },
   { time: "1:2.5", note: "A3", dur: "8n" },
   { time: "1:3", note: "C4", dur: "8n" },
 ]).start();
 part3 = new Tone.Part((time, value) => {
   synth1.triggerAttackRelease(value.note, value.dur, time);
 }, [
   { time: 0, note: "C5", dur: "8n" },
   { time: "0:0.5", note: "E5", dur: "8n" },
   { time: "0:1", note: "G5", dur: "8n" },
   { time: "0:1.5", note: "B5", dur: "8n" },
   { time: "0:2", note: "C6", dur: "8n" },
   { time: "0:2.5", note: "A5", dur: "8n" },
   { time: "0:3", note: "F5", dur: "8n" },
   { time: "1:0", note: "G5", dur: "8n" },
   { time: "1:0.5", note: "E5", dur: "8n" },
   { time: "1:1", note: "C5", dur: "8n" },
   { time: "1:1.5", note: "D5", dur: "8n" },
   { time: "1:2", note: "E5", dur: "8n" },
   { time: "1:2.5", note: "F5", dur: "8n" },
   { time: "1:3", note: "G5", dur: "8n" },
 ]).start();








part1.loop = true;
 part1.loopEnd = "1m";
 part2.loop = true;
 part2.loopEnd = "1m";
 part3.loop = true;
 part3.loopEnd = "4m";


 




 
 }









function draw() {
  background(220);
  
  switch (gameState) {
    case GameStates.START:
      textAlign(CENTER, CENTER);
      textSize(18);
      text("Press ENTER to Start", width / 2, height / 2 - 30);

      // If the intro music is playing, hide the button
      if (introPlaying) {
        introButton.hide();
      } else {
        introButton.show();
      }
      break;
    case GameStates.PLAY:
      textAlign(LEFT, TOP);
      text("Score: " + score, textPadding, textPadding);
      textAlign(RIGHT, TOP);
      text("Time: " + Math.ceil(time), width - textPadding, textPadding);
      introButton.hide();

      time -= deltaTime / 1000;
      if (time <= 0) {
        gameState = GameStates.END;
        Tone.Transport.stop(); 
        gameoverPlayer.start(); 

        
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

    
    if (introPlaying) {
      introPlayer.stop(); 
      introPlaying = false;
    }

    
    if (Tone.Transport.state !== "started") {
      Tone.Transport.start();
      Tone.Transport.bpm.value = initialBPM;
   
    }
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
        this.x += this.speed;
        if (this.x > width) this.x = -frameWidth;
      } else if (this.direction === -1) {
        this.x -= this.speed;
        if (this.x < -frameWidth) this.x = width;
      } else if (this.direction === 2) {
        this.y -= this.speed;
        if (this.y < -frameHeight) this.y = height;
      } else if (this.direction === -2) {
        this.y += this.speed;
        if (this.y > height) this.y = -frameHeight;
    }
  }
}

  show() {
    push();
    translate(this.x, this.y);
       if (this.direction === 1) {
     rotate(0);
   } else if (this.direction === -1) {
     rotate(PI);
   } else if (this.direction === 2) {
     rotate(-HALF_PI);
   } else if (this.direction === -2) {
     rotate(HALF_PI);
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
      splatPlayer.start();
      for (let bug of bugs) if (!bug.isSquished) bug.speed = 2 + speedIncrease;
    }
  }
}

function resetGame() {
  bugs = [];
  for (let i = 0; i < 5; i++) bugs.push(new Bug(random(80, width - 80), random(80, height - 80)));
  spawnTimer = millis();
}

function mousePressed() {
  if (gameState !== GameStates.PLAY) return;
  let bugClicked = false;
  for (let bug of bugs) {
    if (dist(mouseX, mouseY, bug.x, bug.y) < frameWidth / 2) {
      bug.squish();
      let newBPM = min(Tone.Transport.bpm.value + bpmIncrement, maxBpm);
      Tone.Transport.bpm.value = newBPM;
      bugClicked = true;
    }
  }
  if (!bugClicked) swooshPlayer.start();
}


function startIntroMusic() {
  if (!introPlaying) {
    introPlayer.start(); 
    introPlaying = true;
  }
  introButton.hide();  
}
