import CanvasManager from "./canvas-manager";

export default async () => {
  const canvasManager = new CanvasManager({
    canvas: document.getElementById(`result1-canvas`),
    frame: {
      width: Math.min(window.innerWidth, window.innerHeight),
      height: Math.min(window.innerWidth, window.innerHeight),
    },
    canvasSizeGetter() {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
  });

  const OBJECTS = {
    back: {
      src: `back.png`,
      width: 76.71,
      height: 42.10,
      top: 36.71,
      left: 12.26,
      right: 0,
      bottom: 0,
      transforms: {},
    },
    airplane: {
      src: `airplane.png`,
      width: 17.21,
      height: 17.21,
      top: 37.73,
      left: 85.41,
      right: 0,
      bottom: 0,
      transforms: {rotate: 6},
    },
    tree1: {
      src: `tree.png`,
      width: 5,
      height: 13.28,
      top: 55.52,
      left: 55.68,
      right: 0,
      bottom: 0,
      transforms: {},
    },
    tree2: {
      src: `tree 2.png`,
      width: 6.58,
      height: 20.92,
      top: 47.89,
      left: 50.68,
      right: 0,
      bottom: 0,
      transforms: {},
    },
    ice: {
      src: `ice.png`,
      width: 53.55,
      height: 21.97,
      top: 59.86,
      left: 12.91,
      right: 0,
      bottom: 0,
      transforms: {},
    },
    seaCalf: {
      src: `sea-calf-2.png`,
      width: 63.42,
      height: 63.53,
      top: 30.39,
      left: 6.07,
      right: 0,
      bottom: 0,
      transforms: {},
    },
    snowflake1: {
      src: `snowflake.png`,
      width: 22.55,
      height: 22.12,
      top: 55.25,
      left: 55.26,
      right: 0,
      bottom: 0,
      transforms: {rotate: 165, scaleY: -1},
    },
    snowflake2: {
      src: `snowflake.png`,
      width: 29.63,
      height: 29.07,
      top: 43.81,
      left: -1.91,
      right: 0,
      bottom: 0,
      transforms: {rotate: -15},
    },
  };

  await canvasManager.loadImages(OBJECTS);
  Object.values(OBJECTS).forEach((obj) => {
    canvasManager.draw(obj);
  });
};

