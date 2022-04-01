import * as Tone from 'tone';
import { IData } from '../../@types'

//create a synth and connect it to the main output (your speakers)
// const synth = new Tone.Synth().toDestination();
const synth = new Tone.PolySynth(Tone.Synth).toDestination();

export const play = async (data: IData[]) => {
  await Tone.start();
  const now = Tone.now();
  

  data.forEach((d, index) => {
    let note = d.glucose ?? 1 * 10;
    if (d.meal) note = note + d.meal;

    const duration = d.meal ? d.meal/10 : 3;

    console.log(index, d.glucose);
    synth.triggerAttackRelease(note, duration, now + index / 4);
  });
};
