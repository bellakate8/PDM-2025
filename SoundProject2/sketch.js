let synth1, filt, rev, polySynth, noise1, noise2, ampEnv1, ampEnv2, filt1, dist, slider;

let activeKey = null;

let keyNotes = {
  'a': 'A4',
  's': 'B4',
  'd': 'C5',
  'f': 'D5',
  'g': 'E5',
  'h': 'F5',
  'j': 'G5',
  'k': 'A5'
}

let keyNotes1 = {
  'q': 'D4',
  'w': 'F4',
  'e': 'A4'
}

function setup() {
  createCanvas(400, 400);
  filt = new Tone.Filter(1500, "lowpass").toDestination();
  rev = new Tone.Reverb(2).connect(filt);

synth1 = new Tone.Synth({
    envelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.9,
      release: 0.3
    }
  }).connect(rev);
synth1.portamento.value = 0.5;

  polySynth = new Tone.PolySynth(Tone.Synth).connect(rev);
  polySynth.set({
    envelope: {
      attack: 0.1,
      decay: 0.1,
      sustain: 1,
      release: 0.1
    },
    oscillator: {
      type: 'sawtooth'
    }
  })
polySynth.volume.value = -6;

  ampEnv1 = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.5,
    sustain: 0,
    release: 0.1
  }).toDestination();

  filt1 = new Tone.Filter(1500, "highpass").connect(ampEnv1);
  noise1 = new Tone.Noise('pink').start().connect(filt1);

  dist = new Tone.Distortion(0.4).connect(filt);
  synth1.connect(dist);

  slider = createSlider(100, 5000, 1500, 50);
  slider.position(20, 70);
}

function draw() {
  background(200,214,191);
  text("Keys a-k are the monophonic synth,\nkeys q-e are the polyphonic synth,\nkey z is the noise.", 20, 20);
  text("Filter Frequency: " + slider.value() + "Hz", 20, 100);
  filt.frequency.value = slider.value();
}

function keyPressed() {
  let pitch = keyNotes[key];
  let pitch1 = keyNotes1[key];
  if (pitch && key !== activeKey) {
    synth1.triggerRelease();
    activeKey = key;
    synth1.triggerAttack(pitch);
  } else if (pitch1) {
    polySynth.triggerAttack(pitch1);
  } else if (key === "z") {
    ampEnv1.triggerAttackRelease(0.1);
  }
}

function keyReleased() {
  let pitch1 = keyNotes1[key];
  if (key === activeKey) {
    synth1.triggerRelease();
    activeKey = null;
  } else if (pitch1) {
    polySynth.triggerRelease(pitch1);
  }
}
