let img;
let noise, noiseEnv, noiseFilter,bubbleSynth, bubbleFilter ;
let playing = false;



function setup() {
  createCanvas(400, 400);

  
  noiseFilter = new Tone.Filter(800, "bandpass").toDestination();
  noiseEnv = new Tone.AmplitudeEnvelope({
    attack: 0.5,   
    decay: 1,     
    sustain: 1,    
    release: 3     
  }).connect(noiseFilter);
  noise = new Tone.Noise("white").connect(noiseEnv);
 
bubbleFilter = new Tone.Filter(500, "lowpass").toDestination();


  Tone.start().then(() => console.log("Audio context started"));
}

function draw() {
  background(220);
  if (img) {
    image(img, 50, 50, 300, 300);
  }
}
function mousePressed() {
  if (!playing) {
    playing = true;


    noise.start();
    noiseEnv.triggerAttack();
    
 setTimeout(() => {
      playing = false;
      noiseEnv.triggerRelease();
    }, 6000);  
  
   
    img = loadImage("media/steaming.jpg"); 
  }
}
