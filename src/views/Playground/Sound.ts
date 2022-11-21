import { ManTwoTone, Segment } from '@mui/icons-material';
import * as Tone from 'tone';
import * as Visuals from './Visuals';
import { Envelope } from 'tone';
import { data } from './data2'; //here is where I can load different data sets
import _, { now } from 'lodash'; 

//BG array - this works, but there might be a more elegant way, and I need to decide whether to actually remove the null values or not
//from Luciano: const glucoseValues = data.filter((value) => value.glucose !== null)
let glucoseValues = data.map((value) => value.glucose);
glucoseValues = glucoseValues.filter(Number)
let midGlucose = glucoseValues.at(Math.floor(glucoseValues.length/2));
let avgGlucose = (glucoseValues.reduce((previousValue, currentValue)=>previousValue + currentValue, 0)/glucoseValues.length)
let calcMode = (Math.round(midGlucose%1*10) + Math.floor(midGlucose))%7;
let calcKey = (Math.round(avgGlucose%1*10) + Math.floor(avgGlucose))%12;
let bpmIndex = 0;
let bpmRange = [120, 220]
let calcBPM = convertRange((Math.round(glucoseValues.at(bpmIndex)%1*10)+Math.floor(glucoseValues.at(bpmIndex)))%20,[0, 20], bpmRange);
console.log(calcMode);
console.log(calcKey);
console.log(calcBPM);
// create new arrays with values to feed into visuals and sounds through scaling/linear interpolation
//from: https://stackoverflow.com/questions/14224535/scaling-between-two-number-ranges
function convertRange(value, r1, r2) {
  return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
}
const maxBG = Math.max(...glucoseValues)
const minBG = Math.min(...glucoseValues)

//arrays for use with visuals and audio (not dedicated, use as appropriate)
const bgRange01 = glucoseValues.map((num) => convertRange(num, [minBG, maxBG],[0,1]))
const bgRange9 = glucoseValues.map((num) => convertRange(num, [minBG, maxBG],[0,9]))
const bgRange310 = glucoseValues.map((num) => convertRange(num, [minBG, maxBG],[0.0001,0.01]))
const bgRange100 = glucoseValues.map((num) => convertRange(num, [minBG, maxBG],[0.01,0.1]))
const bgRange300 = glucoseValues.map((num) => convertRange(num, [minBG, maxBG],[0.0001,0.1]))


//SCALE_MAKING (with help from https://www.guitarland.com/MusicTheoryWithToneJS/PlayModes.html)
const majorFormula = [0,2,4,5,7,9,11];
const modeNames = ['major','dorian','phrygian','lydian','mixolydian','aeolian','locrian']
const myModeNum = calcMode;
const myKey = calcKey;
const myModeFormula = makeModeFormula(majorFormula, myModeNum, myKey, 11);

//parentScaleFormula is interval spacings to be repeated (ex. majorFormula), modeNum picks which interval to use as root (hence selects mode), root is pitch class (i.e key) base MIDI note from 0-11, formulaLength allows for creating longer and shorter repetitions of the interval spacings
function makeModeFormula(parentScaleFormula, modeNum, root = 0, formulaLength=9,) {
  let scaleIndex = 0;
  let modeFormula = [];
  let modeInterval;
  for(let i=0; i<parentScaleFormula.length*formulaLength; i++) {
    scaleIndex = (i+modeNum) % parentScaleFormula.length;
    modeInterval = (parentScaleFormula[scaleIndex] - parentScaleFormula[modeNum] +12) % 12;
   modeInterval = modeInterval + root + Math.floor(i/parentScaleFormula.length)*12;
    modeFormula.push(modeInterval);
    
  }  
  console.log("mode="+modeNames[modeNum]+" formula="+modeFormula.toString());
  return modeFormula;
}

//modeFormula = the result of the modeMakeFormula
//upperLimit = how many scaleDegrees and hence intervals to spread the notes out over, my recommended approach is to take the length of the majorFormula (or whatever base interval formula being used) and multiply by the desired number of octaves to spread out over.
//baseOctave = what octave to start at
function convertBGtoNotes(modeFormula: number[], upperLimit, baseOctave=2) {
  let bgScaleDegs;
  let bgIntervals;
  bgScaleDegs = glucoseValues.map((num) => Math.round(convertRange(num, [minBG, maxBG],[0, upperLimit-1])));
  bgIntervals = bgScaleDegs.map((num)=>modeFormula[num]+baseOctave*12);
  console.log("test");
  console.log(bgIntervals);
  return bgIntervals;
  }

  

//create a synth and connect it to the main output (your speakers)
const reverbA = new Tone.Reverb(5);

const panVolS1 = new Tone.PanVol(-0.7, 0).toDestination();
const panVolS2 = new Tone.PanVol(0.7, 0).toDestination();
const panVolS3 = new Tone.PanVol(0, 0).toDestination();
const panVolK1 = new Tone.PanVol(0, -6).toDestination();

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
  envelope: {attack: 0.01},
  modulationEnvelope: {attack: 0.1,
  decay: 1.5,
  sustain: 0.1},
  modulation: {type: "triangle8"},
  oscillator: {type: "triangle13"}
  
  })

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

fmSwell.connect(panVolS1);
fmSwell.chain(reverbA, Tone.Destination);

kickSynth.connect(panVolK1);



// * simple
export const playSimple = async () => {
  await Tone.start();
  //debugging:
  console.log(glucoseValues.map(x=> x * 10));
  //console.log(Tone);
  //play a middle 'C' for the duration of an 8th note
  Visuals.start();
  //Visuals.fx4(function(){return Math.random()*10});
 // Visuals.fx3(20, 0.5)
 Visuals.fx5(glucoseValues.map(x=> x * 10), glucoseValues, 0.6, 0.5);
  synth.triggerAttackRelease('C3', '8n');
//this works
 for (let i = 0; i < data.length; i++)
{
  let bg = data[i].glucose;
  if (bg >= 8.0){
    console.log("high ", i, data[i].glucose)
    //do something here
  } else
  if (bg<= 7.9 && bg>=4.0 ){
    console.log("target ", i, data[i].glucose)
    //do something here
  } else
  if (bg < 4.0){
    console.log("low ", i, data[i].glucose)
    //do something here
  }
}



};

// * simple double
export const playTimeControl = async () => {
  await Tone.start();
  const now = Tone.now();
  // trigger the attack immediately
  //!synth.triggerAttack('C4', now);
  // wait one second before triggering the release
  //! synth.triggerRelease(now + 3);
  synth.triggerAttackRelease('G2', '1n', now + 1, 1);
};

// * Sequence

export const playSquence = async () => {
  await Tone.start();
  
//FFT analyzes the audio output, can use the numbers it returns to do stuff to the visuals
  const fft = new Tone.FFT(16); 
fmSwell.connect(fft);
fft.set({
  normalRange: true,
  smoothing: 0.8 
})
 let counterS1Vel = 0;
 let counterS2Vel = 0;
 let counterS3Vel = 0;
 const bgMIDI = convertBGtoNotes(myModeFormula, majorFormula.length*3, 4);
 const bgFreqs = bgMIDI.map((num)=>Tone.mtof(num));
 console.log(bgFreqs);
 Visuals.start();
 Visuals.fx8(bgRange01, fftNorm);
 //bgVisEvent(now);

  //k is # of pulses, n is # of slots, c is notename as String (ex. "C3"); this is for creating rhythms from the data
  function bjorklund(k, n, c) {
    //returns k pulses (1s) followed by n-k rests (0s)
    let seq = _.times(k, _.constant([1])).concat(_.times(n - k, _.constant([0])));
    //console.log(_.times(k, _.constant([1])).concat(_.times(n - k, _.constant([0]))))
    while (true) {
      //sets two variables to partition the values in the seq
      let [head, remainder] = _.partition(seq, i => _.isEqual(i, seq[0]));
      //console.log(head, remainder, seq);
      if (remainder.length < 2) break;
      for (let i = 0; i < Math.min(head.length, remainder.length); i++) {
        seq[i] = seq[i].concat(seq.pop());
      }
    }
   return _.flatten(seq).map(function(value){if(value == 1){return c}else{return null}})
  };

let notes = []
let notes2 = []
let notes3 = []
let kick = []



// create a new sequence with the synth and notes
const synthPart = new Tone.Sequence(
  function(time, note) {
    fmSynth.triggerAttackRelease(note, "64n", time, bgRange01[counterS2Vel%bgRange01.length]);
    console.log("synthPart1");
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
      })*/
    counterS1Vel++;
  },
  notes,
  "8n"
);

// create a new sequence with the synth and notes
const synthPart2 = new Tone.Sequence(
  function(time, note) {
  fmSynth2.triggerAttackRelease(note, "64n", time, bgRange01[counterS2Vel%bgRange01.length]);
  console.log("synthPart2");
  //need to delete this if you want it to happen every bjorklund switch instead of note switch
  /*fmSynth2.set({
    harmonicity: 0.5,
      modulationIndex: 15,
      envelope: {attack: 0.01},
      modulationEnvelope: {attack: 0.1,
      decay: 0.25,
      sustain: 0.1},
      modulation: {type: "sine"},
      oscillator: {type: "sine"}
    });*/
    counterS2Vel++;
  },
  notes2,
  "8n"
);

// create a new sequence with the synth and notes
const synthPart3 = new Tone.Sequence(
  function(time, note) {
    fmSynth3.triggerAttackRelease(note, "64n", time, bgRange01[counterS2Vel%bgRange01.length]);
    console.log("synthPart3");
      //need to delete this if you want it to happen every bjorklund switch instead of note switch
  /* fmSynth3.set({
      harmonicity: 5.5,
      modulationIndex: 5,
      envelope: {attack: 0.01},
      modulationEnvelope: {attack: 0.1,
      decay: 0.25,
      sustain: 0.1},
      modulation: {type: "sine"},
      oscillator: {type: "sine"}
      })*/
    counterS3Vel++;
  },
  notes3,
  "8n"
);

// create a new sequence with the synth and notes
const kickPart = new Tone.Sequence(
  function(time, note) {
    kickSynth.triggerAttackRelease(note, "16n", time);
  },
  kick,
  "2n"
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
function swellFMEvent1 (s, freq, atk, dur) {Tone.Transport.schedule((time)=>{
fmSwell.triggerAttackRelease(freq, dur);
fmSwell.set({
  harmonicity: 0.5,
  modulationIndex: 5,
  envelope: {attack: atk},
  modulationEnvelope: {attack: atk,
  decay: 1.5,
  sustain: 0.1},
  modulation: {type: "triangle8"},
  oscillator: {type: "triangle13"}
  });
}, s);}

function timbreShift(s, synthName, harmon, modindex) {Tone.Transport.schedule((time)=>{
  synthName.set({
    harmonicity: harmon,
    modulationIndex: modindex,
    envelope: {attack: 0.001,
      decay: 0.005},
      modulationEnvelope: {attack: 0.001,
      decay: 0.05,
      sustain: 0},
      modulation: {type: "sine"},
      oscillator: {type: "sine"}
    });
  }, s);}

//function for scheduling changes in the Bjorklund rhythm of the specified synth part and any other change that would be synchornized with these changes
//s is for shedule - the time at which it happens; n is the BG number
function bgEvent (s, n, freq) { Tone.Transport.schedule((time) => {
  synthPart.events = bjorklund(bgSplitMin(n), bgSplitMax(n), freq)
  console.log(synthPart.events)
  console.log(n)
  Tone.Draw.schedule(() => {
		// do drawing or DOM manipulation here
   // Visuals.fx3(/*function(){let y =  fft.getValue(); return y[1]*1000 + 1}*/s, function(){let y =  fft.getValue(); return y[0]*10});
	//Visuals.fx5(n, n, fftNorm, n*0.05)	
   console.log(time);
	}, time);
}, s);}

//little function to get fft data values roughly between 0 and 1 - can change multiplier for different ranges etc.
//Q- how can your perform an operation (multiply) on the value returned from a function?
function fftNorm (){let y =  fft.getValue(); return y[0]*10}

//function for scheduling changes in the Bjorklund rhythm of the specified synth part and any other change that would be synchornized with these changes
function bgEvent2 (s, n, freq) { Tone.Transport.schedule((time) => {
  synthPart2.events = bjorklund(bgSplitMin(n), bgSplitMax(n), freq)
  console.log(synthPart2.events)
  console.log(n)
  Tone.Draw.schedule(() => {
		// do drawing or DOM manipulation here
   // Visuals.fx3(/*function(){let y =  fft.getValue(); return y[1]*1000 + 1}*/s, function(){let y =  fft.getValue(); return y[0]*10});
//	Visuals.fx2(),	
   console.log(time);
	}, time);
}, s);}

//function for scheduling changes in the Bjorklund rhythm of the specified synth part and any other change that would be synchornized with these changes
function bgEvent3 (s, n, freq) { Tone.Transport.schedule((time) => {
  synthPart3.events = bjorklund(bgSplitMin(n), bgSplitMax(n), freq)
  console.log(synthPart3.events)
  console.log(n)
  Tone.Draw.schedule(() => {
		// do drawing or DOM manipulation here
   // Visuals.fx3(/*function(){let y =  fft.getValue(); return y[1]*1000 + 1}*/s, function(){let y =  fft.getValue(); return y[0]*10});
//	Visuals.fx4(n),	
   console.log(time);
	}, time);
}, s);}

//function for scheduling changes in the Bjorklund rhythm of the specified synth part and any other change that would be synchornized with these changes
function bgEvent4 (s, n, freq) { Tone.Transport.schedule((time) => {
  kickPart.events = bjorklund(bgSplitMin(n), bgSplitMax(n), freq)
  console.log(kickPart.events)
  console.log(n)
  Tone.Draw.schedule(() => {
		// do drawing or DOM manipulation here
   // Visuals.fx3(/*function(){let y =  fft.getValue(); return y[1]*1000 + 1}*/s, function(){let y =  fft.getValue(); return y[0]*10});
//	Visuals.fx4(n),	
   console.log(time);
	}, time);
}, s);}

//helper functions for the bgEvent functions, Min splits the BG number at the decimal and returns the smaller of the two resulting integers, Max returns the larger
function bgSplitMin (n){
  return Math.min(Math.round(n%1*10), Math.floor(n))
}
function bgSplitMax (n){
  return Math.max(Math.round(n%1*10), Math.floor(n))
}

//function for scheduling changes in the visuals
//  s is when it will happen - when it is scheduled for.
function bgVisEvent (s) { Tone.Transport.schedule((time) => {
    Tone.Draw.schedule(() => {
		// do drawing or DOM manipulation here
	Visuals.fx8();
   console.log(time);
	}, time);
}, s);}

//function for scheduling changes in the visuals
//  s is when it will happen - when it is scheduled for.
function bgVisEvent2 (s, g, inv, sat, nn, ns, rot, lthrsh, ltol) { Tone.Transport.schedule((time) => {
  Tone.Draw.schedule(() => {
  // do drawing or DOM manipulation here
Visuals.fx7(g, inv, sat, nn, ns, rot, lthrsh, ltol)	
 console.log(time);
}, time);
}, s);}

// this works as a basic organizational logic - still need to work out coordination of sound and visual events which might not always change at the same time
//with the current BG events they keep going with their current data until they receive a change
//first variable of the BG event is when it is scheduled to happen, second is the BG value


//Overarching strucutre of the generative composition: 1) create as many Time counters as necessary; a new Time counter is necessary for any change that doesn't happen at the same time as an existing change (which will already have its own Time counter)
//2) Using a for loop, go through all the glucose values and create a score from that; this is where the timing of changes is determined, as well as what data is fed into the functions to determine what the changes are
let bgTime = 0;
let bgTimeB = 0;
let bgTimeC = 0;
let bgTime2 = 0;
for (let i = 0; i < glucoseValues.length; i++)
{
  let bg = glucoseValues[i];
  //differences in timing for different streams of events
  //multiplication factor determines how long to wait before changing
  //addition in the bracket determines offset of BG value from dataset
  bgTime = bgTime + glucoseValues[i]*1;
  bgTimeB = bgTimeB + glucoseValues[i+1]*1;
  bgTimeC = bgTimeC + glucoseValues[i+2]*1;
  bgTime2 = bgTime2 + glucoseValues[i]*3;
  //conditional statements to allow the possibility of different things happening depending on whether the BG reading is high, on target, or low (could add more conditions and/or change existing thresholds)
  if (bg >= 8.0){
    console.log("high ", glucoseValues[i], bgTime, bgFreqs[i])
    //do something here
    //swell event happens at the designated time and with the designated Frequecy value (multiplication by 0.5 would lower it by 1 octave)
    swellFMEvent1(bgTime, bgFreqs[i]*0.125, bgRange01[i], bgRange01[i]*2 ); 
    //bgEvents are the Euclidean rhythms, here we determine when they change (ex. bgTime), what rhythm they change to (ex. glucoseValues[i]), and what frequency/note is played (ex. bg Freqs[i])
    bgEvent(bgTime, glucoseValues[i], bgFreqs[i]);
    timbreShift(bgTime, fmSynth, 1.5, fmMIOffset*bgRange01[i]);
    bgEvent2(bgTimeB, glucoseValues[i+1], bgFreqs[i+1]);
    timbreShift(bgTimeB, fmSynth2, 1.5, fmMIOffset*bgRange01[i+1]);
    bgEvent3(bgTimeC, glucoseValues[i+2], bgFreqs[i+2]);
    timbreShift(bgTimeC, fmSynth3, 1.5, fmMIOffset*bgRange01[i+2]);
    bgEvent4(bgTime, glucoseValues[i], bgFreqs[i]*0.125);
//scheduling of a change in the visuals, first variable determines when, the rest depend on the visual synth in question
//bgVisEvent2(bgTime2, bgRange01[i], bgRange01[i+1], bgRange9[i+2], bgRange9[i+7], bgRange01[i+3], bgRange310[i+4], bgRange100[i+5], bgRange300[i+6])
    //bgVisEvent2(bgTime, bgRange01[i], bgRange01[i], bgRange9[i],bgRange9[i], bgRange01[i], bgRange310[i], bgRange100[i], bgRange300[i])
  } else
  if (bg<= 7.9 && bg>=4.0 ){
    console.log("target ", glucoseValues[i], bgTime, bgFreqs[i])
    //do something here
   swellFMEvent1(bgTime, bgFreqs[i]*0.125, bgRange01[i], bgRange01[i]*5); 
   bgEvent(bgTime, glucoseValues[i], bgFreqs[i]);
   timbreShift(bgTime, fmSynth, 1.5, fmMIOffset*bgRange01[i]);
   bgEvent2(bgTimeB, glucoseValues[i+1], bgFreqs[i+1]);
   timbreShift(bgTimeB, fmSynth2, 1.5, fmMIOffset*bgRange01[i+1]);
   bgEvent3(bgTimeC, glucoseValues[i+2], bgFreqs[i+2]);
   timbreShift(bgTimeC, fmSynth3, 1.5, fmMIOffset*bgRange01[i+2]);
   bgEvent4(bgTime, glucoseValues[i], bgFreqs[i]*0.125);

   //bgVisEvent2(bgTime2, bgRange01[i], bgRange01[i+1], bgRange9[i+2], bgRange9[i+7], bgRange01[i+3], bgRange310[i+4], bgRange100[i+5], bgRange300[i+6])
  // bgVisEvent2(bgTime, bgRange01[i], bgRange01[i], bgRange9[i],bgRange9[i], bgRange01[i], bgRange310[i], bgRange100[i], bgRange300[i])
  } else
  if (bg < 4.0){
    console.log("low ", glucoseValues[i], bgTime, bgFreqs[i])
    //do something here
    swellFMEvent1(bgTime, bgFreqs[i]*0.125, bgRange01[i], bgRange01[i]*2); 
 
   bgEvent(bgTime, glucoseValues[i], bgFreqs[i]);
   timbreShift(bgTime, fmSynth, 1.5, fmMIOffset*bgRange01[i]);
   bgEvent2(bgTimeB, glucoseValues[i+1], bgFreqs[i+1]);
   timbreShift(bgTimeB, fmSynth2, 1.5, fmMIOffset*bgRange01[i+1]);
   bgEvent3(bgTimeC, glucoseValues[i+2], bgFreqs[i+2]);
   timbreShift(bgTimeC, fmSynth3, 1.5, fmMIOffset*bgRange01[i+2]);
   bgEvent4(bgTime, glucoseValues[i], bgFreqs[i]*0.125);
    //bgVisEvent2(bgTime2, bgRange01[i], bgRange01[i+1], bgRange9[i+2], bgRange9[i+7], bgRange01[i+3], bgRange310[i+4], bgRange100[i+5], bgRange300[i+6])
  // bgVisEvent2(bgTime, bgRange01[i], bgRange01[i], bgRange9[i],bgRange9[i], bgRange01[i], bgRange310[i], bgRange100[i], bgRange300[i])
  }
}

};



// *  Scheduling
export const playScheduling = async () => {
  await Tone.start();
  //proof of concept - the bgData numbers are rounded off and uses as indices for the notesArray in the Tone.Sequence below
  const bgData: number[] = [5.7, 2.3, 11.8, 9.5, 7.8];
  const notesArray: string[] = [
    'C3',
    'A3',
    'G3',
    'E3',
    'C2',
    'C3',
    'A3',
    'G3',
    'E3',
    'C2',
    'C3',
    'A3',
    'G3',
    'E3',
    'C2',
  ];

  const synthA = new Tone.FMSynth().toDestination();
  const synthB = new Tone.AMSynth().toDestination();

  //play a note every quarter-note
  /*const loopA = new Tone.Loop((time) => {
    synthA.triggerAttackRelease('C2', '8n', time);
  }, '4n').start(0);*/

  const seq = new Tone.Sequence(
    (time, note) => {
      synthA.triggerAttackRelease(note, 0.1, time);
      // subdivisions are given as subarrays
    },
    [
      notesArray[Math.round(bgData[0])],
      [notesArray[1], notesArray[2], notesArray[3]],
      notesArray[Math.round(bgData[3])],
      [notesArray[3], notesArray[4]],
    ]
  ).start(0);

  //play another note every off quarter-note, by starting it "8n"
  const loopB = new Tone.Loop((time) => {
    synthB.triggerAttackRelease('G2', '8n', time);
  }, '4n').start('8n');
  // all loops start until the Transport is started
  Tone.Transport.bpm.value = 80;
  Tone.Transport.start();
  //Tone.Transport.start("+1", "2:0:0");// this works

  // schedule an event on the 2nd measure
  Tone.Transport.schedule((time) => {
    // invoked on measure 2

    console.log('measure 2!');

    seq.stop();
    //synthB.envelope.attack = 0.6;
    synthB.set({
      harmonicity: 0.1,
      envelope: {
        attack: 0.1,
        release: 0.1,
      },
    });
    //Tone.Transport.bpm.value = 140;// not sure how to make this work properly
  }, '2:0:0');

  // schedule an event on the 4th measure
  Tone.Transport.schedule((time) => {
    // invoked on measure 2
    // loopA.stop(time);
    console.log('measure 4!');
    //synthB.setNote('F3');
    seq.start();
    //synthB.envelope.attack = 0.6;
    synthB.harmonicity.rampTo(15, 2);
    //synthB.harmonicity.value = 15;
  }, '4:0:0');
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
    loop: false,
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

console.log(data[0].glucose);
data.forEach((item, index) => {
  console.log(item.glucose, index*5);
});
