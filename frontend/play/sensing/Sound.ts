import type { Data } from '@/@types';
import _ from 'lodash';
import * as Tone from 'tone';
import { MidiNote } from 'tone/build/esm/core/type/NoteUnits';
import * as Visuals from './Visuals';

export interface SensingSugar {
  isPlaying: boolean;
  reset: () => void;
}

let initiated = false;

function run() {
  if (Tone.context.state !== 'running') {
    Tone.start();
    console.log('not running');
  }
}

//create a synth and connect it to the main output (your speakers)
const reverbA = new Tone.Reverb(5);

const meter = new Tone.Meter();
const compressor = new Tone.Compressor(-18, 3);
const masterVol = new Tone.Volume(-1.5);

const panVolS1 = new Tone.PanVol(-0.7, 0).toDestination();
const panVolS2 = new Tone.PanVol(0.7, 0).toDestination();
const panVolS3 = new Tone.PanVol(0, 0).toDestination();
const panVolK1 = new Tone.PanVol(0, -6).toDestination();
//const autoPanner = new Tone.AutoPanner("1n").toDestination().start();

const kickSynth = new Tone.MembraneSynth();

const synth = new Tone.PluckSynth();
const synth2 = new Tone.PluckSynth();
const synth3 = new Tone.PluckSynth();

const fmSynth = new Tone.FMSynth();
const fmSynth2 = new Tone.FMSynth();
const fmSynth3 = new Tone.FMSynth();

const fmMIOffset = 50;

const fmSwell = new Tone.FMSynth();
fmSwell.set({
  harmonicity: 0.5,
  modulationIndex: 5,
  envelope: { attack: 0.01 },
  modulationEnvelope: { attack: 0.1, decay: 1.5, sustain: 0.1 },
  modulation: { type: 'triangle8' },
  oscillator: { type: 'triangle13' },
});

synth.connect(panVolS1);
synth.chain(reverbA, Tone.Destination);
synth2.connect(panVolS2);
synth2.chain(reverbA, Tone.Destination);
synth3.connect(panVolS3);
synth3.chain(reverbA, Tone.Destination);

fmSynth.connect(panVolS1);
fmSynth.chain(reverbA, Tone.Destination);
fmSynth2.connect(panVolS2);
fmSynth2.chain(reverbA, Tone.Destination);
fmSynth3.connect(panVolS3);
fmSynth3.chain(reverbA, Tone.Destination);

fmSwell.toDestination();
fmSwell.chain(reverbA, Tone.Destination);

kickSynth.connect(panVolK1);

Tone.Destination.chain(compressor, masterVol);
//used only to check vol levels - do not run except for diagnostics (and add "meter" to the Destination.chain):
//setInterval(() => // console.log(meter.getValue()), 100);

//FFT analyzes the audio output, can use the numbers it returns to do stuff to the visuals
const fft = new Tone.FFT(16);
fmSwell.connect(fft);
fft.set({
  normalRange: true,
  smoothing: 0.8,
});

// * Sequence

export const playSquence = async (data: Data[]): Promise<SensingSugar> => {
  //* avoid calling repeateadly
  if (initiated) return { isPlaying: true, reset };
  initiated = true;
  //start Tone.js if not already started
  run();
  //BG array - this works, but there might be a more elegant way, and I need to decide whether to actually remove the null values or not
  //from Luciano: const glucoseValues = data.filter((value) => value.glucose !== null)
  let glucoseValues = data.filter((value) => value.glucose > 0).map((value) => value.glucose);
  // console.log('length = ' + glucoseValues.length);
  glucoseValues = glucoseValues.slice(0, 1000);
  //glucoseValues = glucoseValues.filter(Number);
  // glucoseValues.forEach((item, index) => {
  //   // console.log(item, index);
  // });
  // // console.log(glucoseValues.reduce((previousValue, currentValue)=>previousValue + currentValue, 0));
  let midGlucose = glucoseValues.at(Math.floor(glucoseValues.length / 2));

  //@ts-ignore
  // let avgGlucose = ((glucoseValues.reduce((previousValue, currentValue) => previousValue + currentValue, 0))/glucoseValues.length);
  let avgGlucose =
    (glucoseValues.reduce(
      (previousValue, currentValue) => (previousValue ?? 0) + (currentValue ?? 0),
      0,
    ) ?? 1) / glucoseValues.length;

  //@ts-ignore
  let calcMode = (Math.round((midGlucose % 1) * 10) + Math.floor(midGlucose)) % 7;
  let calcKey = (Math.round((avgGlucose % 1) * 10) + Math.floor(avgGlucose)) % 12;
  let bpmIndex = 0;
  let bpmRange: [number, number] = [120, 220];
  const timeFactor = 1;

  //@ts-ignore
  let calcBPM = convertRange(
    //calculates a number between 0 and 20 based on the bgValue at a selected index (bpmIndex) and normalizes it to the bpmRange
    (Math.round((glucoseValues[bpmIndex] % 1) * 10) + Math.floor(glucoseValues[bpmIndex])) % 20,
    [0, 20],
    bpmRange,
  );
  // console.log('Mode # = ' + calcMode);
  // console.log('Key # = ' + calcKey);
  // console.log('BPM = ' + calcBPM);

  //create a reordered array for CGM data playback, intersperses groups of 3
  let interBGArray = [];
  let interJump = Math.floor(glucoseValues.length / 3);
  let partArray1 = glucoseValues.slice(0, interJump);
  let partArray2 = glucoseValues.slice(interJump, interJump * 2);
  let partArray3 = glucoseValues.slice(interJump * 2);
  for (let i = 0; i < interJump; i++) {
    interBGArray.push(partArray1[i], partArray2[i], partArray3[i]);
  }
  // console.log('INTER =', interBGArray);
  // console.log('BG = ', glucoseValues);
  //////////////////////////////////

  // create new arrays with values to feed into visuals and sounds through scaling/linear interpolation
  //from: https://stackoverflow.com/questions/14224535/scaling-between-two-number-ranges
  function convertRange(value: number, r1: [number, number], r2: [number, number]) {
    return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
  }
  //addition of 0.00001 is to ensure that even if user submits dataset with only one glucose value it will not throw an error; added to maxBG it will select the lower of the output range - subtract from minBG to select higher ;
  const maxBG = Math.max(...glucoseValues) + 0.00001;
  const minBG = Math.min(...glucoseValues);

  //arrays for use with visuals and audio (not dedicated, use as appropriate)
  const bgRange01 = glucoseValues.map((num) => convertRange(num, [minBG, maxBG], [0.0001, 1]));
  //example code for clipping at decimal - need to change bgRange01 from const to let
  //bgRange01 = bgRange01.map((num)=> Number(num.toFixed(4)))
  // console.log('bgRange01 = ' + bgRange01);
  const bgVel = glucoseValues.map((num) => convertRange(num, [minBG, maxBG], [0.3, 1]));
  const bgRangeColour = glucoseValues.map((num) => convertRange(num, [minBG, maxBG], [0, 2.5]));
  const bgRangeScale = glucoseValues.map((num) => convertRange(num, [minBG, maxBG], [0.03, 2]));
  const bgRangeOscSync = glucoseValues.map((num) =>
    convertRange(num, [minBG, maxBG], [0.05, 0.15]),
  );
  const bgRangeRota = glucoseValues.map((num) => convertRange(num, [minBG, maxBG], [-0.2, 0.2]));
  const bgRangeMsMult = glucoseValues.map((num) => convertRange(num, [minBG, maxBG], [1, 99]));
  const bgRangeMsOffSet = glucoseValues.map((num) => convertRange(num, [minBG, maxBG], [0.2, 5]));

  // for visuals; function to interpolate between values in an array (http://hevi.info/do-it-yourself/interpolating-and-array-to-fit-another-size/; https://stackoverflow.com/questions/26941168/javascript-interpolate-an-array-of-numbers)
  // modified to fix typescript errors
  function interpolateArray(data: number[], fitCount: number) {
    var linearInterpolate = function (before: number, after: number, atPoint: number) {
      return before + (after - before) * atPoint;
    };

    var newData = new Array();
    var springFactor = (data.length - 1) / (fitCount - 1);
    newData[0] = data[0]; // for new allocation
    for (var i = 1; i < fitCount - 1; i++) {
      var tmp = i * springFactor;
      var before: number = Math.floor(tmp);
      var after: number = Math.ceil(tmp);
      var atPoint = tmp - before;
      newData[i] = linearInterpolate(data[before], data[after], atPoint);
    }
    newData[fitCount - 1] = data[data.length - 1]; // for new allocation
    return newData;
  }

  //for visuals; interpolating between selections from the glucose array; taking first value, quarter-way value, half-way value, three-quarter value, and back to first value
  const glucoseSel = [
    bgRangeScale[0],
    bgRangeScale[Math.floor(bgRangeScale.length * 0.25)],
    bgRangeScale[Math.floor(bgRangeScale.length * 0.5)],
    bgRangeScale[Math.floor(bgRangeScale.length * 0.75)],
    bgRangeScale[0],
  ];
  const glucoseInterpolated: number[] = interpolateArray(glucoseSel, 1005);
  // console.log(glucoseInterpolated);
  const scaleOff = Math.floor(bgRangeScale.length * 0.125);
  const glucoseSel2 = [
    bgRangeScale[0 + scaleOff],
    bgRangeScale[Math.floor(bgRangeScale.length * 0.25) + scaleOff],
    bgRangeScale[Math.floor(bgRangeScale.length * 0.5) + scaleOff],
    bgRangeScale[Math.floor(bgRangeScale.length * 0.75) + scaleOff],
    bgRangeScale[0 + scaleOff],
  ];
  const glucoseInterpolated2: number[] = interpolateArray(glucoseSel2, 505);

  //generating values to drive the colours of the visuals
  const r1: number = bgRangeColour[0];
  const g1: number = bgRangeColour[Math.floor(glucoseValues.length * 0.167)];
  const b1: number = bgRangeColour[Math.floor(glucoseValues.length * 0.333)];
  const r2: number = bgRangeColour[Math.floor(glucoseValues.length * 0.5)];
  const g2: number = bgRangeColour[Math.floor(glucoseValues.length * 0.667)];
  const b2: number = bgRangeColour[Math.floor(glucoseValues.length * 0.833)];
  // console.log('colour', r1, g1, b1, r2, g2, b2);

  //generating values to drive the osc sync of the visuals
  const oscSync1 = bgRangeOscSync[0];
  const oscSync2 = bgRangeOscSync[bgRangeOscSync.length - 1];
  // console.log('oscSync', oscSync1, oscSync2);

  //generating values to drive the rotation speed of the visuals
  const rota1 = bgRangeRota[1];
  const rota2 = bgRangeRota[bgRangeOscSync.length - 2];
  // console.log('rota', rota1, rota2);

  //generating values to drive the modulateScale multiple of the visuals
  const msMult1 = bgRangeMsMult[2];
  const msMult2 = bgRangeMsMult[bgRangeOscSync.length - 3];
  // console.log('msMult', msMult1, msMult2);

  //generating values to drive the modulateScale offset of the visuals
  const msOffSet1 = bgRangeMsOffSet[3];
  const msOffSet2 = bgRangeMsOffSet[bgRangeOscSync.length - 4];
  // console.log('msOffSet', msOffSet1, msOffSet2);

  //SCALE_MAKING (with help from https://www.guitarland.com/MusicTheoryWithToneJS/PlayModes.html)
  const majorFormula = [0, 2, 4, 5, 7, 9, 11];
  const modeNames = ['major', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian'];
  const myModeNum = calcMode;
  const myKey = calcKey;
  const myModeFormula = makeModeFormula(majorFormula, myModeNum, myKey, 11);

  //parentScaleFormula is interval spacings to be repeated (ex. majorFormula), modeNum picks which interval to use as root (hence selects mode), root is pitch class (i.e key) base MIDI note from 0-11, formulaLength allows for creating longer and shorter repetitions of the interval spacings
  function makeModeFormula(
    parentScaleFormula: number[],
    modeNum: number,
    root = 0,
    formulaLength = 9,
  ) {
    let scaleIndex = 0;
    let modeFormula = [];
    let modeInterval;
    for (let i = 0; i < parentScaleFormula.length * formulaLength; i++) {
      scaleIndex = (i + modeNum) % parentScaleFormula.length;
      modeInterval = (parentScaleFormula[scaleIndex] - parentScaleFormula[modeNum] + 12) % 12;
      modeInterval = modeInterval + root + Math.floor(i / parentScaleFormula.length) * 12;
      modeFormula.push(modeInterval);
    }
    // console.log('mode=' + modeNames[modeNum] + ' formula=' + modeFormula.toString());
    return modeFormula;
  }

  //modeFormula = the result of the modeMakeFormula
  //upperLimit = how many scaleDegrees and hence intervals to spread the notes out over, my recommended approach is to take the length of the majorFormula (or whatever base interval formula being used) and multiply by the desired number of octaves to spread out over.
  //baseOctave = what octave to start at
  function convertBGtoNotes(modeFormula: number[], upperLimit: number, baseOctave = 2) {
    let bgScaleDegs;
    let bgIntervals;
    bgScaleDegs = glucoseValues.map((num) =>
      Math.round(convertRange(num, [minBG, maxBG + 0.01], [0, upperLimit - 1])),
    );
    bgIntervals = bgScaleDegs.map((num) => modeFormula[num] + baseOctave * 12);
    return bgIntervals;
  }

  let counterS1Vel = 0;
  let counterS2Vel = 0;
  let counterS3Vel = 0;
  const bgMIDI = convertBGtoNotes(myModeFormula, majorFormula.length * 3, 4);
  const bgMIDI2 = convertBGtoNotes(myModeFormula, majorFormula.length * 4, 3);
  const bgMIDI3 = convertBGtoNotes(myModeFormula, majorFormula.length * 2, 4);
  const bgFreqs = bgMIDI.map((num) => Tone.mtof(num as MidiNote)); // this is weird, Tone.js says it wants a number... maybe because for all it knows it could be too high a number i.e above 127
  const bgFreqs2 = bgMIDI2.map((num) => Tone.mtof(num as MidiNote));
  const bgFreqs3 = bgMIDI3.map((num) => Tone.mtof(num as MidiNote));
  // console.log('freqs2 = ' + bgFreqs2);
  Visuals.start();
  //Visuals.fx8(bgRange01, fftNorm);
  Visuals.fx11(
    fftNorm,
    glucoseInterpolated,
    glucoseInterpolated2,
    oscSync1,
    oscSync2,
    rota1,
    rota2,
    msMult1,
    msMult2,
    msOffSet1,
    msOffSet2,
    r1,
    g1,
    b1,
    r2,
    g2,
    b2,
  );
  //Visuals.fx11bw(fftNorm, glucoseInterpolated, glucoseInterpolated2, oscSync1, oscSync2, rota1, rota2, msMult1, msMult2, msOffSet1, msOffSet2);

  //k is # of pulses, n is # of slots, c is notename as String (ex. "C3"); this is for creating rhythms from the data
  //bjorklund funtion source: https://codepen.io/teropa/pen/zPEYbY by Tero Parvaianen
  function bjorklund(k: number, n: number, c: number) {
    //returns k pulses (1s) followed by n-k rests (0s)
    let seq = _.times(k, _.constant([1])).concat(_.times(n - k, _.constant([0])));
    //// console.log(_.times(k, _.constant([1])).concat(_.times(n - k, _.constant([0]))))
    while (true) {
      //sets two variables to partition the values in the seq
      let [head, remainder] = _.partition(seq, (i) => _.isEqual(i, seq[0]));
      //// console.log(head, remainder, seq);
      if (remainder.length < 2) break;
      for (let i = 0; i < Math.min(head.length, remainder.length); i++) {
        seq[i] = seq[i].concat(seq.pop() ?? 0);
      }
    }
    return _.flatten(seq).map(function (value) {
      if (value == 1) {
        return c;
      } else {
        return null;
      }
    });
  }

  // create a new sequence with the synth - actual sequence undefined here, but defined by bgEvent function
  const synthPart = new Tone.Sequence(
    function (time, note) {
      fmSynth.triggerAttackRelease(note, '64n', time, bgVel[counterS1Vel % bgVel.length]);
      // console.log('synthPart1');
      //this is a way of inserting other variable changes on a per note basis
      //need to delete this if you want it to happen every bjorklund switch instead of note switch
      /* fmSynth.set({
      harmonicity: 1.5,
      modulationIndex: 5,
      envelope: {attack: 0.01},
      modulationEnvelope: {attack: 0.1,
      decay: 0.25,
      sustain: 0.1},
      modulation: {type: "sine"},
      oscillator: {type: "sine"}
      }) */
      counterS1Vel++;
    },
    undefined,
    '8n',
  );

  // create a new sequence with the synth - actual sequence undefined here, but defined by bgEvent function
  const synthPart2 = new Tone.Sequence(
    function (time, note) {
      fmSynth2.triggerAttackRelease(note, '64n', time, bgVel[counterS1Vel % bgVel.length]);
      // console.log('synthPart2');
      counterS1Vel++;
    },
    undefined,
    '8n',
  );

  // create a new sequence with the synth - actual sequence undefined here, but defined by bgEvent function
  const synthPart3 = new Tone.Sequence(
    function (time, note) {
      fmSynth3.triggerAttackRelease(note, '64n', time, bgVel[counterS1Vel % bgVel.length]);
      // console.log('synthPart3');
      counterS1Vel++;
    },
    undefined,
    '8n',
  );

  // create a new sequence with the synth - actual sequence undefined here, but defined by bgEvent function
  const kickPart = new Tone.Sequence(
    function (time, note) {
      kickSynth.triggerAttackRelease(note, '16n', time);
    },
    undefined,
    '2n',
  );

  // Setup the synth to be ready to play on beat 1
  synthPart.start();
  synthPart2.start();
  synthPart3.start();
  kickPart.start();

  // Note that if you pass a time into the start method
  // you can specify when the synth part starts
  // e.g. .start('8n') will start after 1 eighth note// start the transport which controls the main timeline
  //Set the BPM and start the transport
  Tone.Transport.bpm.value = calcBPM;
  Tone.Transport.start();

  //function for punctual events that will happen on top of the Euclidean rhythms created by the Bjorklund function
  function swellFMEvent1(s: number, freq: number, atk: number, dur: number) {
    Tone.Transport.schedule((time) => {
      fmSwell.triggerAttackRelease(freq, dur);
      fmSwell.set({
        harmonicity: 0.5,
        modulationIndex: 5,
        envelope: { attack: atk },
        modulationEnvelope: { attack: atk, decay: 1.5, sustain: 0.1 },
        modulation: { type: 'triangle8' },
        oscillator: { type: 'triangle13' },
      });
    }, s);
  }

  function timbreShift(s: number, synthName: Tone.FMSynth, harmon: number, modindex: number) {
    Tone.Transport.schedule((time) => {
      synthName.set({
        harmonicity: harmon,
        modulationIndex: modindex,
        envelope: { attack: 0.001, decay: 0.005 },
        modulationEnvelope: { attack: 0.001, decay: 0.05, sustain: 0 },
        modulation: { type: 'sine' },
        oscillator: { type: 'sine' },
      });
    }, s);
  }

  //function for scheduling changes in the Bjorklund rhythm of the specified synth part and any other change that would be synchornized with these changes
  //s is for shedule - the time at which it happens; n is the BG number
  function bgEvent(s: number, n: number, freq: number) {
    Tone.Transport.schedule((time) => {
      synthPart.events = bjorklund(bgSplitMin(n), bgSplitMax(n), freq);
      // console.log(synthPart.events);
      // console.log(n);
      Tone.Draw.schedule(() => {
        // do drawing or DOM manipulation here
        // Visuals.fx3(/*function(){let y =  fft.getValue(); return y[1]*1000 + 1}*/s, function(){let y =  fft.getValue(); return y[0]*10});
        //Visuals.fx5(n, n, fftNorm, n*0.05)
        //// console.log(time);
      }, time);
    }, s);
  }

  //little function to get fft data values roughly between 0 and 1 - can change multiplier for different ranges etc.
  //Q- how can your perform an operation (multiply) on the value returned from a function?
  function fftNorm() {
    let y = fft.getValue();
    return y[0] * 10;
  }

  //function for scheduling changes in the Bjorklund rhythm of the specified synth part and any other change that would be synchornized with these changes
  function bgEvent2(s: number, n: number, freq: number) {
    Tone.Transport.schedule((time) => {
      synthPart2.events = bjorklund(bgSplitMin(n), bgSplitMax(n), freq);
      // console.log(synthPart2.events);
      // console.log(n);
      Tone.Draw.schedule(() => {
        // do drawing or DOM manipulation here
        // Visuals.fx3(/*function(){let y =  fft.getValue(); return y[1]*1000 + 1}*/s, function(){let y =  fft.getValue(); return y[0]*10});
        //	Visuals.fx2(),
        //// console.log(time);
      }, time);
    }, s);
  }

  //function for scheduling changes in the Bjorklund rhythm of the specified synth part and any other change that would be synchornized with these changes
  function bgEvent3(s: number, n: number, freq: number) {
    Tone.Transport.schedule((time) => {
      synthPart3.events = bjorklund(bgSplitMin(n), bgSplitMax(n), freq);
      // console.log(synthPart3.events);
      // console.log(n);
      Tone.Draw.schedule(() => {
        // do drawing or DOM manipulation here
        // Visuals.fx3(/*function(){let y =  fft.getValue(); return y[1]*1000 + 1}*/s, function(){let y =  fft.getValue(); return y[0]*10});
        //	Visuals.fx4(n),
        //// console.log(time);
      }, time);
    }, s);
  }

  //function for scheduling changes in the Bjorklund rhythm of the specified synth part and any other change that would be synchornized with these changes
  function bgEvent4(s: number, n: number, freq: number) {
    Tone.Transport.schedule((time) => {
      kickPart.events = bjorklund(bgSplitMin(n), bgSplitMax(n), freq);
      // console.log(kickPart.events);
      // console.log(n);
      Tone.Draw.schedule(() => {
        // do drawing or DOM manipulation here
        // Visuals.fx3(/*function(){let y =  fft.getValue(); return y[1]*1000 + 1}*/s, function(){let y =  fft.getValue(); return y[0]*10});
        //	Visuals.fx4(n),
        //// console.log(time);
      }, time);
    }, s);
  }

  //helper functions for the bgEvent functions, Min splits the BG number at the decimal and returns the smaller of the two resulting integers, Max returns the larger
  function bgSplitMin(n: number) {
    return Math.min(Math.round((n % 1) * 10), Math.floor(n));
  }
  function bgSplitMax(n: number) {
    return Math.max(Math.round((n % 1) * 10), Math.floor(n));
  }
  /*
  //function for scheduling changes in the visuals
  //  s is when it will happen - when it is scheduled for.
  function bgVisEvent(s:number) {
    Tone.Transport.schedule((time) => {
      Tone.Draw.schedule(() => {
        // do drawing or DOM manipulation here
        Visuals.fx8();
        // console.log(time);
      }, time);
    }, s);
  }
*/
  //function for scheduling changes in the visuals
  //  s is when it will happen - when it is scheduled for.
  function bgVisEvent2(
    s: number,
    g: number,
    inv: number,
    sat: number,
    nn: number,
    ns: number,
    rot: number,
    lthrsh: number,
    ltol: number,
  ) {
    Tone.Transport.schedule((time) => {
      Tone.Draw.schedule(() => {
        // do drawing or DOM manipulation here
        Visuals.fx7(g, inv, sat, nn, ns, rot, lthrsh, ltol);
        // console.log(time);
      }, time);
    }, s);
  }

  // this works as a basic organizational logic - still need to work out coordination of sound and visual events which might not always change at the same time
  //with the current BG events they keep going with their current data until they receive a change
  //first variable of the BG event is when it is scheduled to happen, second is the BG value

  //Overarching strucutre of the generative composition: 1) create as many Time counters as necessary; a new Time counter is necessary for any change that doesn't happen at the same time as an existing change (which will already have its own Time counter)
  //2) Using a for loop, go through all the glucose values and create a score from that; this is where the timing of changes is determined, as well as what data is fed into the functions to determine what the changes are
  let bgTime = 0;
  let bgTimeB = 0; //if you don't want everything to start at once you can make an offset (ex. set bgTimeB to glucoseValues[1])
  let bgTimeC = 0; //if you don't want everything to start at once you can make an offset (ex. set bgTimeC to glucoseValues[2])
  let bgTime2 = 0;
  //FIGURE OUT HOW TO LOOP
  for (let i = 0; i < glucoseValues.length; i++) {
    let bg = glucoseValues[i];
    //do something here
    //swell event happens at the designated time and with the designated Frequecy value (multiplication by 0.5 would lower it by 1 octave)
    swellFMEvent1(bgTime, bgFreqs[i] * 0.125, bgRange01[i], bgRange01[i] * 5);
    //bgEvents are the Euclidean rhythms, here we determine when they change (ex. bgTime), what rhythm they change to (ex. glucoseValues[i]), and what frequency/note is played (ex. bg Freqs[i])
    bgEvent(bgTime, glucoseValues[i], bgFreqs[i]);
    timbreShift(
      bgTime,
      fmSynth,
      1.5,
      fmMIOffset * bgRange01[(bgRange01.length - i) % glucoseValues.length],
    );
    bgEvent2(
      bgTimeB,
      glucoseValues[(i + 1) % glucoseValues.length],
      bgFreqs2[(i + 1) % glucoseValues.length],
    );
    timbreShift(
      bgTimeB,
      fmSynth2,
      1.5,
      fmMIOffset * bgRange01[(bgRange01.length - i + 1) % glucoseValues.length],
    );
    bgEvent3(
      bgTimeC,
      glucoseValues[(i + 2) % glucoseValues.length],
      bgFreqs3[(i + 2) % glucoseValues.length],
    );
    timbreShift(
      bgTimeC,
      fmSynth3,
      1.5,
      fmMIOffset * bgRange01[(bgRange01.length - i + 2) % glucoseValues.length],
    );
    bgEvent4(bgTime, glucoseValues[i], bgFreqs[i] * 0.0625);
    //REMOVED CONDITIONAL LOGIC SINCE I WASN"T USING IT AND IT MAKES IT EASIER TO EDIT
    //conditional statements to allow the possibility of different things happening depending on whether the BG reading is high, on target, or low (could add more conditions and/or change existing thresholds)
    /*if (bg >= 8.0) {
      // console.log('high ', glucoseValues[i], bgTime, bgFreqs[i]);
      //do something here
      //swell event happens at the designated time and with the designated Frequecy value (multiplication by 0.5 would lower it by 1 octave)
      swellFMEvent1(bgTime, bgFreqs[i] * 0.125, bgRange01[i], bgRange01[i] * 5);
      //bgEvents are the Euclidean rhythms, here we determine when they change (ex. bgTime), what rhythm they change to (ex. glucoseValues[i]), and what frequency/note is played (ex. bg Freqs[i])
      bgEvent(bgTime, glucoseValues[i], bgFreqs[i]);
      timbreShift(bgTime, fmSynth, 1.5, fmMIOffset * bgRange01[i]);
      bgEvent2(
        bgTimeB,
        glucoseValues[(i + 1) % glucoseValues.length],
        bgFreqs[(i + 1) % glucoseValues.length]
      );
      timbreShift(bgTimeB, fmSynth2, 1.5, fmMIOffset * bgRange01[(i + 1) % glucoseValues.length]);
      bgEvent3(
        bgTimeC,
        glucoseValues[(i + 2) % glucoseValues.length],
        bgFreqs[(i + 2) % glucoseValues.length]
      );
      timbreShift(bgTimeC, fmSynth3, 1.5, fmMIOffset * bgRange01[(i + 2) % glucoseValues.length]);
      bgEvent4(bgTime, glucoseValues[i], bgFreqs[i] * 0.0625);
      //scheduling of a change in the visuals, first variable determines when, the rest depend on the visual synth in question
      //bgVisEvent2(bgTime2, bgRange01[i], bgRange01[i+1], bgRange9[i+2], bgRange9[i+7], bgRange01[i+3], bgRange310[i+4], bgRange100[i+5], bgRange300[i+6])
      //bgVisEvent2(bgTime, bgRange01[i], bgRange01[i], bgRange9[i],bgRange9[i], bgRange01[i], bgRange310[i], bgRange100[i], bgRange300[i])
    } else if (bg <= 7.9 && bg >= 4.0) {
      // console.log('target ', glucoseValues[i], bgTime, bgFreqs[i]);
      //do something here
      swellFMEvent1(bgTime, bgFreqs[i] * 0.125, bgRange01[i], bgRange01[i] * 5);
      bgEvent(bgTime, glucoseValues[i], bgFreqs[i]);
      timbreShift(bgTime, fmSynth, 1.5, fmMIOffset * bgRange01[i]);
      bgEvent2(
        bgTimeB,
        glucoseValues[(i + 1) % glucoseValues.length],
        bgFreqs[(i + 1) % glucoseValues.length]
      );
      timbreShift(bgTimeB, fmSynth2, 1.5, fmMIOffset * bgRange01[(i + 1) % glucoseValues.length]);
      bgEvent3(
        bgTimeC,
        glucoseValues[(i + 2) % glucoseValues.length],
        bgFreqs[(i + 2) % glucoseValues.length]
      );
      timbreShift(bgTimeC, fmSynth3, 1.5, fmMIOffset * bgRange01[(i + 2) % glucoseValues.length]);
      bgEvent4(bgTime, glucoseValues[i], bgFreqs[i] * 0.0625);

      //bgVisEvent2(bgTime2, bgRange01[i], bgRange01[i+1], bgRange9[i+2], bgRange9[i+7], bgRange01[i+3], bgRange310[i+4], bgRange100[i+5], bgRange300[i+6])
      // bgVisEvent2(bgTime, bgRange01[i], bgRange01[i], bgRange9[i],bgRange9[i], bgRange01[i], bgRange310[i], bgRange100[i], bgRange300[i])
    } else if (bg < 4.0) {
      // console.log('low ', glucoseValues[i], bgTime, bgFreqs[i]);
      //do something here
      swellFMEvent1(bgTime, bgFreqs[i] * 0.125, bgRange01[i], bgRange01[i] * 5);

      bgEvent(bgTime, glucoseValues[i], bgFreqs[i]);
      timbreShift(bgTime, fmSynth, 1.5, fmMIOffset * bgRange01[i]);
      bgEvent2(
        bgTimeB,
        glucoseValues[(i + 1) % glucoseValues.length],
        bgFreqs[(i + 1) % glucoseValues.length]
      );
      timbreShift(bgTimeB, fmSynth2, 1.5, fmMIOffset * bgRange01[(i + 1) % glucoseValues.length]);
      bgEvent3(
        bgTimeC,
        glucoseValues[(i + 2) % glucoseValues.length],
        bgFreqs[(i + 2) % glucoseValues.length]
      );
      timbreShift(bgTimeC, fmSynth3, 1.5, fmMIOffset * bgRange01[(i + 2) % glucoseValues.length]);
      bgEvent4(bgTime, glucoseValues[i], bgFreqs[i] * 0.0625);
      //bgVisEvent2(bgTime2, bgRange01[i], bgRange01[i+1], bgRange9[i+2], bgRange9[i+7], bgRange01[i+3], bgRange310[i+4], bgRange100[i+5], bgRange300[i+6])
      // bgVisEvent2(bgTime, bgRange01[i], bgRange01[i], bgRange9[i],bgRange9[i], bgRange01[i], bgRange310[i], bgRange100[i], bgRange300[i])
    }*/
    //differences in timing for different streams of events
    //multiplication factor determines how long to wait before changing
    //addition in the bracket determines offset of BG value from dataset
    bgTime = bgTime + glucoseValues[i] * timeFactor;
    bgTimeB = bgTimeB + glucoseValues[(i + 1) % glucoseValues.length] * timeFactor; //need the modulo because of the offset (i+1), so it can wrap back around
    bgTimeC = bgTimeC + glucoseValues[(i + 2) % glucoseValues.length] * timeFactor; //need the modulo because of the offset (i+2), so it can wrap back around
    bgTime2 = bgTime2 + glucoseValues[i] * 3;
    // console.log('bgTimeB' + bgTimeB);
    // console.log('bgTimeC' + bgTimeC);
  }
  // console.log('bgTime' + bgTime);
  // console.log('bgTimeB' + bgTimeB);
  // console.log('bgTimeC' + bgTimeC);
  //// console.log(calcBPM*bgTime*0.01667*0.25);
  //// console.log(calcBPM*bgTime*0.01667*0.25%Math.floor(calcBPM*bgTime*0.01667*0.25))
  const bars = Math.floor(calcBPM * bgTime * 0.01667 * 0.25);
  const beats = Math.floor(
    ((calcBPM * bgTime * 0.01667 * 0.25) % Math.floor(calcBPM * bgTime * 0.01667 * 0.25)) * 4,
  );
  // console.log(bars);
  // console.log(beats);
  // console.log(bars + ':' + beats);

  const endLoop = bars + ':' + beats; //4 + ":" + 1;/*calcBPM*(bgTime+2.9+3.6+12)*0.01667*0.25*/

  Tone.Transport.setLoopPoints(0, endLoop);
  Tone.Transport.loop = true;

  return {
    reset,
    isPlaying: true,
  };
};

const reset = async () => {
  Tone.Transport.stop();
  Tone.Transport.cancel();
  initiated = false;
};
