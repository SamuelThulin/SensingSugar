import * as Tone from 'tone';

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();

// * simple
export const playSimple = async () => {
  await Tone.start();
  //play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease('G2', '8n');
};

// * simple double
export const playTimeControl = async () => {
  await Tone.start();
  const now = Tone.now();
  // trigger the attack immediately
  //!synth.triggerAttack('C4', now);
  // wait one second before triggering the release
  //! synth.triggerRelease(now + 3);
  synth.triggerAttackRelease('G3', '1n', now + 1, 0.1);
};

// * Sequence
export const playSquence = async () => {
  await Tone.start();
  const now = Tone.now();
  synth.triggerAttackRelease('C4', '8n', now);
  synth.triggerAttackRelease('E4', '8n', now + 0.5);
  synth.triggerAttackRelease('G4', '8n', now + 1);
};

// *  Scheduling
export const playScheduling = async () => {
  await Tone.start();

  const synthA = new Tone.FMSynth().toDestination();
  const synthB = new Tone.AMSynth().toDestination();

  //play a note every quarter-note
  const loopA = new Tone.Loop((time) => {
    synthA.triggerAttackRelease('C2', '8n', time);
  }, '4n').start(0);

  //play another note every off quarter-note, by starting it "8n"
  const loopB = new Tone.Loop((time) => {
    synthB.triggerAttackRelease('C4', '8n', time);
  }, '4n').start('8n');

  // all loops start until the Transport is started
  Tone.Transport.start();
};

//*  Instruments
export const playInstruments = async () => {
  await Tone.start();

  //pass in some initial values for the filter and filter envelope
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const now = Tone.now();
  synth.triggerAttack('D4', now);
  synth.triggerAttack('F4', now + 0.5);
  synth.triggerAttack('A4', now + 1);
  synth.triggerAttack('C4', now + 1.5);
  synth.triggerAttack('E4', now + 2);
  synth.triggerRelease(['D4', 'F4', 'A4', 'C4', 'E4'], now + 4);
};

//*  Samples
export const playSamples = async () => {
  await Tone.start();

  const player = new Tone.Player(
    'https://tonejs.github.io/audio/berklee/gong_1.mp3'
  ).toDestination();
  Tone.loaded().then(() => {
    player.start();
  });
};

//*  Sampler
export const playSampler = async () => {
  await Tone.start();

  const sampler = new Tone.Sampler({
    urls: {
      C4: 'C4.mp3',
      'D#4': 'Ds4.mp3',
      'F#4': 'Fs4.mp3',
      A4: 'A4.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/salamander/',
  }).toDestination();

  Tone.loaded().then(() => {
    sampler.triggerAttackRelease(['Eb4', 'G4', 'Bb4'], 0.5);
  });
};

//*  Efects
export const playEffectts = async () => {
  await Tone.start();

  const player = new Tone.Player({
    url: 'https://tonejs.github.io/audio/berklee/gurgling_theremin_1.mp3',
    loop: true,
    autostart: true,
  });
  //create a distortion effect
  const distortion = new Tone.Distortion(0.4).toDestination();
  //connect a player to the distortion
  player.connect(distortion);
};

//*  Signals
export const playSignal = async () => {
  await Tone.start();

  const osc = new Tone.Oscillator().toDestination();
  // start at "C4"
  osc.frequency.value = 'C4';
  // ramp to "C5" over 2 seconds
  osc.frequency.rampTo('C5', 2);
};
