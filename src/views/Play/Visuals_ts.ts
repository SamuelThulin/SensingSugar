import REGL from 'regl';
import { Hydra } from 'hydra-ts';

let h: any;

export const start = () => {
  const canvas = document.getElementById('visuals');
  if (!canvas) return;

  const regl = REGL();

  console.log(regl);

  const hydra = new Hydra({
    regl,                    // canvas element to render to. If none is supplied, a canvas will be created and appended to the screen
    width: 1280,            // defaults to canvas width when included, 1280 if not
    height: 720,            // defaults to canvas height when included, 720 if not
  });

  // fx1();

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
  osc(4, 0.1, 1.2).out();
};

const r = (min = 0, max = 1) => Math.random() * (max - min) + min;

export const fx2 = () => {
  const { src, osc, shape, o0, solid } = h;

  solid(1, 1, 1)
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
