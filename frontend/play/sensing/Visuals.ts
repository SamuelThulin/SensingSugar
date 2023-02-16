//@ts-ignore
import Hydra from 'hydra-synth';

let h: any;

export const start = () => {
  const canvas = document.getElementById('visuals');

  h = new Hydra({
    canvas,                    // canvas element to render to. If none is supplied, a canvas will be created and appended to the screen
    // width: 1280,            // defaults to canvas width when included, 1280 if not
    // height: 720,            // defaults to canvas height when included, 720 if not
    autoLoop: true,            // if true, will automatically loop using requestAnimationFrame.If set to false, you must implement your own loop function using the tick() method (below)
    makeGlobal: false,         // if false, will not pollute global namespace (note: there are currently bugs with this)
    detectAudio: false,        // recommend setting this to false to avoid asking for microphone
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
