import { ManTwoTone, Segment } from '@mui/icons-material';
import * as Tone from 'tone';
import * as Visuals from './Visuals';
import { Envelope } from 'tone';
import { data } from './data';
import _ from 'lodash'; 

//SCALE_MAKING (with help from https://www.guitarland.com/MusicTheoryWithToneJS/PlayModes.html)
const majorFormula = [0,2,4,5,7,9,11];
const modeNames = ['major','dorian','phrygian','lydian','mixolydian','aeolian','locrian']
const myModeNum = 1;
const myModeFormula = makeModeFormula(majorFormula, myModeNum, 10, 11);

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
//const reverbA = new Tone.Reverb(1).toDestination();
const reverbA = new Tone.Reverb(1);

const panVolS1 = new Tone.PanVol(-0.5, 0).toDestination();
const panVolS2 = new Tone.PanVol(0.5, 0).toDestination();
const panVolS3 = new Tone.PanVol(0, 0).toDestination();

const synth = new Tone.PluckSynth();
const synth2 = new Tone.PluckSynth();
const synth3 = new Tone.PluckSynth();

const fmSynth = new Tone.FMSynth();
const fmSynth2 = new Tone.FMSynth();
const fmSynth3 = new Tone.FMSynth();

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
//const synth4 = new Tone.Synth().toDestination();
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

//BG array - this works, but there might be a more elegant way, and I need to decide whether to actually remove the null values or not

//from Luciano: const glucoseValues = data.filter((value) => value.glucose !== null)
let glucoseValues = data.map((value) => value.glucose);
glucoseValues = glucoseValues.filter(Number)


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
 // const now = Tone.now();

 let counterS1Vel = 0;
 let counterS2Vel = 0;
 let counterS3Vel = 0;
 const bgMIDI = convertBGtoNotes(myModeFormula, majorFormula.length*3, 4);
 const bgFreqs = bgMIDI.map((num)=>Tone.mtof(num));

 console.log(bgFreqs);

  //k is # of pulses, n is # of slots, c is notename as String (ex. "C3")
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
    //return _.flatten( seq);
    
  };
  //console.log(bjorklund(3,7, "A3"));
let fft = new Tone.FFT(16); 
let notes = []
let notes2 = []
let notes3 = []
Tone.Destination.connect(fft);
fft.set({
  normalRange: true,
  smoothing: 0.8 
})

console.log(notes);
/*
synth.set({
  attackNoise: 10,
});

synth2.set({
  envelope: {
    attack: 0.005,
    release: 0.1,
    sustain: 0.3,
  },
});
synth3.set({
  envelope: {
    attack: 0.005,
    release: 0.1,
  },
});*/
// create a new sequence with the synth and notes
const synthPart = new Tone.Sequence(
  function(time, note) {
    synth.triggerAttackRelease(note, "64n", time, 1);
    fmSynth.triggerAttackRelease(note, "64n", time, bgRange01[counterS2Vel%bgRange01.length]);
    console.log("synthPart1");
    //this is a way of inserting other variable changes on a per note basis
    synth.set({
      attackNoise: bgRange01[counterS1Vel%bgRange01.length],
      dampening: bgRange01[counterS1Vel%bgRange01.length]*2000,
      resonance: bgRange01[counterS1Vel%bgRange01.length]*0.4+0.6,
      release: 2,
    });
    //console.log(bgRange01[counterS1Vel%bgRange01.length]);
    counterS1Vel++;
  },
  notes,
  "8n"
);

// create a new sequence with the synth and notes
const synthPart2 = new Tone.Sequence(
  function(time, note) {
    synth2.triggerAttackRelease(note, "64n", time, 1);
    fmSynth2.triggerAttackRelease(note, "64n", time, bgRange01[counterS2Vel%bgRange01.length]);
    synth2.set({
      attackNoise: bgRange01[counterS2Vel%bgRange01.length],
      dampening: bgRange01[counterS2Vel%bgRange01.length]*4000,
      resonance: bgRange01[counterS2Vel%bgRange01.length]*0.4+0.6,
      release: 2,
    });
    console.log("synthPart2")
    counterS2Vel++;
  },
  notes2,
  "8n"
);

// create a new sequence with the synth and notes
const synthPart3 = new Tone.Sequence(
  function(time, note) {
    synth3.triggerAttackRelease(note, "64n", time, 1/*bgRange01[counterS2Vel%bgRange01.length]*/);
    fmSynth3.triggerAttackRelease(note, "64n", time, bgRange01[counterS2Vel%bgRange01.length]);
    synth3.set({
      attackNoise: bgRange01[counterS3Vel%bgRange01.length],
      dampening: bgRange01[counterS3Vel%bgRange01.length]*2000,
      resonance: bgRange01[counterS3Vel%bgRange01.length]*0.4+0.6,
      release: 2,
    });
    console.log("synthPart3")
    counterS3Vel++;
  },
  notes3,
  "8n"
);

// Setup the synth to be ready to play on beat 1
synthPart.start();
synthPart2.start();
synthPart3.start();

//too music

/*synthPart.humanize = true;
synthPart2.humanize = true;
synthPart3.humanize = true;*/

//example of continuous/repeated scheduling 
/*function synth1R (s, d, pos) {let srCounter = pos;
Tone.Transport.scheduleRepeat((time) => {
	// use the callback time to schedule events
	//osc.start(time).stop(time + 0.1);
  srCounter++,
  //this works for reading through the values, but it would be even better if it's scope was more limited; you could modulo by the length of the glucoseValue array - 1
  console.log("sr", glucoseValues[srCounter%4+pos]),
  synth.set({
    volume: -30*Math.random(),
    harmonicity: glucoseValues[srCounter%4+pos],
    modulationIndex: 1,
    modulationEnvelope: {
      attack: 0.005,
      release: Math.random(),
    },
    envelope: {
      attack: 0.005,
      release: 1,
    },
  });
  //s is when it should happen, d is how long it should repeat - not sure what effect this has
}, "4n", s, d);
}*/
//synth1R(0);

// Note that if you pass a time into the start method 
// you can specify when the synth part starts 
// e.g. .start('8n') will start after 1 eighth note// start the transport which controls the main timeline
Tone.Transport.bpm.value = 200;
Tone.Transport.start();

function swellFMEvent1 (s, freq) {Tone.Transport.schedule((time)=>{
fmSwell.triggerAttackRelease(freq, "1n")
}, s);}

//s is for shedule - the time at which it happens; n is the BG number
function bgEvent (s, n, freq) { Tone.Transport.schedule((time) => {
  //works - but not very human readable - essentially splitting the BG reading at the decimal, chosing the smaller of the two result integers for the k (pulses) and the larger for the n (slots), could also do something with the note name to make it dynamic
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
function bgEvent2 (s, n, freq) { Tone.Transport.schedule((time) => {
  //works - but not very human readable - essentially splitting the BG reading at the decimal, chosing the smaller of the two result integers for the k (pulses) and the larger for the n (slots), could also do something with the note name to make it dynamic
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

function bgEvent3 (s, n, freq) { Tone.Transport.schedule((time) => {
  //works - but not very human readable - essentially splitting the BG reading at the decimal, chosing the smaller of the two result integers for the k (pulses) and the larger for the n (slots), could also do something with the note name to make it dynamic
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


// bjorklund(Math.min(Math.round(data[1].glucose%1*10), Math.floor(data[1].glucose)), Math.max(Math.round(data[1].glucose%1*10), Math.floor(data[1].glucose)), "G5" )
function bgSplitMin (n){
  return Math.min(Math.round(n%1*10), Math.floor(n))
}
function bgSplitMax (n){
  return Math.max(Math.round(n%1*10), Math.floor(n))
}
console.log(bgSplitMin(data[1].glucose));
console.log(bgSplitMax(data[1].glucose));
//console.log(String("'"+Tone.Frequency(Math.floor(Math.random() * 128), "midi").toNote()+"'"));
//bgEvent(5, data[2].glucose);
/*window.setInterval(() => {
  let fftBins = fft.getValue();
  console.log(fftBins[1]*10)
}, 1000 / 60);*/
//this works!
/*data.forEach((item, index)=>{
  bgEvent(index*10, item.glucose);
  bgEvent2(index*10+10, item.glucose);
  bgEvent3(index*20+10, item.glucose);
});*/

//  s is when it will happen - when it is scheduled for.
function bgVisEvent (s, g, inv, nn, ns, rot, lthrsh, ltol) { Tone.Transport.schedule((time) => {
    Tone.Draw.schedule(() => {
		// do drawing or DOM manipulation here
	Visuals.fx6(g, inv, nn, ns, rot, lthrsh, ltol)	
   console.log(time);
	}, time);
}, s);}

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

let bgTime = 0;
let bgTimeB = 0;
let bgTimeC = 0;
let bgTime2 = 0;
for (let i = 0; i < glucoseValues.length; i++)
{
  let bg = glucoseValues[i];
  //multiplication factor determines how long to wait before changing
  bgTime = bgTime + glucoseValues[i]*1;
  bgTimeB = bgTime + glucoseValues[i+1]*1;
  bgTimeC = bgTime + glucoseValues[i+2]*1;
  bgTime2 = bgTime2 + glucoseValues[i]*3;
  if (bg >= 8.0){
    console.log("high ", glucoseValues[i], bgTime, bgFreqs[i])
    //do something here
    swellFMEvent1(bgTime, bgFreqs[i]*0.125); 
    //fmSwell.triggerAttackRelease(bgFreqs[i], "1n", bgTime);
    bgEvent(bgTime, glucoseValues[i], bgFreqs[i]);
    bgEvent2(bgTimeB, glucoseValues[i+1], bgFreqs[i+1]);
    bgEvent3(bgTimeC, glucoseValues[i+2], bgFreqs[i+2]);
    //synth1R(bgTime, 5, i);
    bgVisEvent2(bgTime2, bgRange01[i], bgRange01[i+1], bgRange9[i+2], bgRange9[i+7], bgRange01[i+3], bgRange310[i+4], bgRange100[i+5], bgRange300[i+6])
    //bgVisEvent2(bgTime, bgRange01[i], bgRange01[i], bgRange9[i],bgRange9[i], bgRange01[i], bgRange310[i], bgRange100[i], bgRange300[i])
  } else
  if (bg<= 7.9 && bg>=4.0 ){
    console.log("target ", glucoseValues[i], bgTime, bgFreqs[i])
    //do something here
   // bgEvent2(bgTime, glucoseValues[i], bgFreqs[i]);
   swellFMEvent1(bgTime, bgFreqs[i]*0.125); 
   //fmSwell.triggerAttackRelease(bgFreqs[i], "1n", bgTime);
   bgEvent(bgTime, glucoseValues[i], bgFreqs[i]);
   bgEvent2(bgTimeB, glucoseValues[i+1], bgFreqs[i+1]);
   bgEvent3(bgTimeC, glucoseValues[i+2], bgFreqs[i+2]);


   bgVisEvent2(bgTime2, bgRange01[i], bgRange01[i+1], bgRange9[i+2], bgRange9[i+7], bgRange01[i+3], bgRange310[i+4], bgRange100[i+5], bgRange300[i+6])
  // bgVisEvent2(bgTime, bgRange01[i], bgRange01[i], bgRange9[i],bgRange9[i], bgRange01[i], bgRange310[i], bgRange100[i], bgRange300[i])
  } else
  if (bg < 4.0){
    console.log("low ", glucoseValues[i], bgTime, bgFreqs[i])
    //do something here
    swellFMEvent1(bgTime, bgFreqs[i]*0.125); 
   // bgEvent3(bgTime, glucoseValues[i], bgFreqs[i]);
   //fmSwell.triggerAttackRelease(bgFreqs[i], "1n", bgTime);
   bgEvent(bgTime, glucoseValues[i], bgFreqs[i]);
   bgEvent2(bgTimeB, glucoseValues[i+1], bgFreqs[i+1]);
   bgEvent3(bgTimeC, glucoseValues[i+2], bgFreqs[i+2]);
    bgVisEvent2(bgTime2, bgRange01[i], bgRange01[i+1], bgRange9[i+2], bgRange9[i+7], bgRange01[i+3], bgRange310[i+4], bgRange100[i+5], bgRange300[i+6])
  // bgVisEvent2(bgTime, bgRange01[i], bgRange01[i], bgRange9[i],bgRange9[i], bgRange01[i], bgRange310[i], bgRange100[i], bgRange300[i])
  }
}

/*Tone.Transport.schedule((time) => {
	// use the time argument to schedule a callback with Draw
	Tone.Draw.schedule(() => {
		// do drawing or DOM manipulation here
    Visuals.fx2(),
		console.log(time);
	}, time);
}, "+10.5");*/

//console.log(Math.round(data[1].glucose%1*10), Math.floor(data[1].glucose))
//this works - not very human readable though...
//console.log(bjorklund(Math.min(Math.round(data[1].glucose%1*10), Math.floor(data[1].glucose)), Math.max(Math.round(data[1].glucose%1*10), Math.floor(data[1].glucose)), "C3" ))
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
