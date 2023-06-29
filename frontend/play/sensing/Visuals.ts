//@ts-ignore
import Hydra from 'hydra-synth';

let h: any;

export const start = () => {
  const canvas = document.getElementById('visuals');

  h = new Hydra({
    canvas, // canvas element to render to. If none is supplied, a canvas will be created and appended to the screen
    //width: 1280,            // defaults to canvas width when included, 1280 if not
    //height: 720,            // defaults to canvas height when included, 720 if not
    autoLoop: true, // if true, will automatically loop using requestAnimationFrame.If set to false, you must implement your own loop function using the tick() method (below)
    makeGlobal: false, // if false, will not pollute global namespace (note: there are currently bugs with this)
    detectAudio: false, // recommend setting this to false to avoid asking for microphone
    // numSources: 4,          // number of source buffers to create initially
    // numOutputs: 4,          // number of output buffers to use. Note: untested with numbers other than 4. render() method might behave unpredictably
    // extendTransforms: [],   // An array of transforms to be added to the synth, or an object representing a single transform
    // precision: null.        // force precision of shaders, can be 'highp', 'mediump', or 'lowp' (recommended for ios). When no precision is specified, will use highp for ios, and mediump for everything else.
    // pb: null,               // instance of rtc-patch-bay to use for streaming
  }).synth;

  fx1();

  // const {
  //   src,
  //   osc,
  //   gradient,
  //   shape,
  //   voronoi,
  //   noise,
  //   s0,
  //   s1,
  //   s2,
  //   s3,
  //   o0,
  //   o1,
  //   o2,
  //   o3,
  //   render,
  //   solid,
  //   smooth,
  // } = h;
};

export const fx1 = () => {
  const { osc } = h;
  osc(10, 0.1, 1.2).out();
};

const r = (min = 0, max = 1) => Math.random() * (max - min) + min;

export const fx2 = () => {
  const { src, osc, shape, o0, solid } = h;

  solid(1, 1, 1)
    //@ts-ignore
    .diff(shape([4, 4, 4, 24].smooth().fast(0.5), r(0.6, 0.93), 0.09).repeat(20, 10))
    .modulateScale(osc(8).rotate(r(-0.5, 0.5)), 0.52)
    .add(
      src(o0)
        .scale(0.965)
        .rotate(0.012 * Math.round(r(-2, 1)))
        .color(r(), r(), r())
        .modulateRotate(o0, r(0, 0.5))
        .brightness(0.15),
      0.7
    )
    .out();
};

export const fx3 = (rate: any, colour: number) => {
  const { osc } = h;
  osc(rate, 0.1, colour).out();
};

export const fx4 = (sides: any) => {
  const { shape } = h;
  shape(sides, 0.2, 0.001).out();
};

export const fx5 = (rate: any, kal: any, red: any, speed: any) => {
  const { osc } = h;
  let pattern = () => osc(rate, 0.139, 0.857).kaleid(kal).shift(red, 0.8, 0.1, 1.9);
  //
  pattern().scrollY(0.086, speed).mult(pattern(), 0.5).out();
};

//arg ranges: g 0-1, inv 0-1, nn 0 - 999, ns 0-1, rot 0.0001 - 0.01, lthrst 0.01-0.1, ltol 0.0001-0.1

export const fx6 = (
  g: number,
  inv: number,
  nn: number,
  ns: number,
  rot: number,
  lthrsh: number,
  ltol: number
) => {
  const { src, osc, noise, o0, o1 } = h;
  osc(5).color(0.5, g, 0.6).saturate(5).invert(inv).mult(noise(nn, ns)).out(o1);
  src(o0).rotate(0.05, rot).scrollY(-0.05, 0.05).layer(src(o1).luma(lthrsh, ltol)).out(o0);
};

export const fx7 = (
  g: number,
  inv: number,
  sat: number,
  nn: number,
  ns: number,
  rot: number,
  lthrsh: number,
  ltol: number
) => {
  const { src, osc, noise, o0, o1 } = h;
  osc(3.5).color(0.5, g, 0.6).saturate(sat).invert(inv).mult(noise(nn, ns)).out(o1);
  src(o0).rotate(0.05, rot).scrollY(-0.05, 0.05).diff(src(o1).luma(lthrsh, ltol)).out(o0);
};

//@ts-ignore
export const fx8 = (bg_array, r) => {
  const { src, osc, o0, o1 } = h;
  osc(15, 0.1)
    .modulateScale(src(o0), 3.5, 2)
    .rotate(r)
    .scale(bg_array.fast(0.1).smooth(1))
    .diff(src(o1))
    .color(1, 0, 0)
    .out(o0);

  osc(5, 0.1).rotate(20).out(o1);

  //render(o0)
};

export const fx8t = () => {
  const { src, osc, o0 } = h;
  osc(15, 0.1)
    .modulateScale(src(o0), 3.5, 2)
    .rotate(30)
    //@ts-ignore
    .scale([2, 4, 5].fast(0.2).smooth())
    .out(o0);
};

export const fx8simple = () => {
  const { osc } = h;
  //@ts-ignore
  osc([15, 0.5].fast(0.1).smooth(1), 0.1).out();
};

export const fx9ease = () => {
  const { shape } = h;
  //@ts-ignore
  shape(4).rotate([-3.14, 3.14].fast(0.1).ease('easeInOutCubic')).out();
};

export const fx10 = () => {
  const { osc, shape } = h;
  var lfo = () => osc(1, 10, 0);

  shape(5).color(1, 0, 0).mult(lfo()).add(shape(4).color(0, 0, 1).mult(lfo().invert()), 1).out();
};

//@ts-ignore
export const fx11 = (
  //@ts-ignore
  r,
  s: number[],
  s2: number[],
  oscSync1: number,
  oscSync2: number,
  rota1: number,
  rota2: number,
  msMult1: number,
  msMult2: number,
  msOffSet1: number,
  msOffSet2: number,
  r1: number,
  g1: number,
  b1: number,
  r2: number,
  g2: number,
  b2: number
) => {
  const { osc, shape, src, o0 } = h;
  var lfo = () => osc(1, 0.5, 0);
  osc(15, oscSync1)
    .modulateScale(src(o0), msMult1, msOffSet1)
    .rotate(r, rota1)
    //@ts-ignore
    .scale(s.fast(10).smooth())
    .color(r1, g1, b1)
    .mult(lfo())
    .add(
      osc(15, oscSync2)
        .modulateScale(src(o0), msMult2, msOffSet2)
        .rotate(120, rota2)
        //@ts-ignore
        .scale(s2.fast(10).smooth())
        .color(r2, g2, b2)
    )
    .out(o0);
};

//@ts-ignore
export const fx11bw = (
  //@ts-ignore
  r,
  s: number[],
  s2: number[],
  oscSync1: number,
  oscSync2: number,
  rota1: number,
  rota2: number,
  msMult1: number,
  msMult2: number,
  msOffSet1: number,
  msOffSet2: number
) => {
  const { osc, shape, src, o0 } = h;
  var lfo = () => osc(1, 0.5, 0);
  osc(15, oscSync1)
    .modulateScale(src(o0), msMult1, msOffSet1)
    .rotate(r, rota1)
    //@ts-ignore
    .scale(s.fast(10).smooth())
    //.color(r1,g1,b1).mult(lfo())
    .add(
      osc(15, oscSync2)
        .modulateScale(src(o0), msMult2, msOffSet2)
        .rotate(120, rota2)
        //@ts-ignore
        .scale(s2.fast(10).smooth())
      //.color(r2, g2, b2)
    )
    .out(o0);
};
