import CanvasManager from "./canvas-manager";
import easing from "./easing";

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
    },
  });

  const OBJECTS = {
    // back: {
    //   src: `back.png`,
    //   width: 76.71,
    //   height: 42.1,
    //   top: 36.71,
    //   left: 12.26,
    // },
    airplane: {
      src: `airplane.png`,
      width: 17.21,
      height: 17.21,
      top: 37.73,
      left: 85.41,
      rotate: 6,
      animations: [
        {
          start: 0,
          duration: 1000,
          easing: easing.linear,
          property: `opacity`,
          from: 0,
          to: 1,
        },
        {
          start: 0,
          duration: 3000,
          easing: easing.linear,
          property: `translateX`,
          from: -45,
          to: 0,
        },
        {
          start: 0,
          duration: 3000,
          easing: (t) => Math.sin(t * Math.PI * 2 * 0.7 + 5) * 0.4 + 0.5,
          property: `translateY`,
          from: -10,
          to: 10,
        },
        {
          start: 0,
          duration: 3000,
          easing: (t) => t - 0.3,
          property: `rotate`,
          from: 80,
          to: -6,
        }
      ]
    },
    tree1: {
      src: `tree.png`,
      width: 5,
      height: 13.28,
      top: 55.52,
      left: 55.68,
      opacity: 0,
      animations: [
        {
          start: 1500,
          duration: 1000,
          easing: easing.linear,
          property: `opacity`,
          from: 0,
          to: 1,
        },
        {
          start: 1500,
          duration: 1000,
          easing: easing.easeOutCubic,
          property: `translateY`,
          from: 20,
          to: 0,
        },
      ],
    },
    tree2: {
      src: `tree 2.png`,
      width: 6.58,
      height: 20.92,
      top: 47.89,
      left: 50.68,
      opacity: 0,
      animations: [
        {
          start: 1000,
          duration: 1000,
          easing: easing.linear,
          property: `opacity`,
          from: 0,
          to: 1,
        },
        {
          start: 1000,
          duration: 1000,
          easing: easing.easeOutCubic,
          property: `translateY`,
          from: 20,
          to: 0,
        },
      ],
    },
    ice: {
      src: `ice.png`,
      width: 53.55,
      height: 21.97,
      top: 59.86,
      left: 12.91,
      animations: [
        {
          start: 0,
          duration: 1000,
          easing: easing.linear,
          property: `opacity`,
          from: 0,
          to: 1,
        },
        {
          start: 0,
          duration: 5000,
          easing: easing.easeOutElastic,
          property: `translateY`,
          from: 50,
          to: 0,
        },
        {
          start: 0,
          duration: 5000,
          easing: easing.easeOutElastic,
          property: `rotate`,
          from: -50,
          to: 0,
        },
      ],
    },
    seaCalf: {
      src: `sea-calf-2.png`,
      width: 63.42,
      height: 63.53,
      top: 30.39,
      left: 6.07,
      animations: [
        {
          start: 0,
          duration: 1000,
          easing: easing.linear,
          property: `opacity`,
          from: 0,
          to: 1,
        },
        {
          start: 0,
          duration: 5000,
          easing: easing.easeOutElastic,
          property: `translateY`,
          from: 50,
          to: 0,
        },
        {
          start: 0,
          duration: 5000,
          easing: easing.easeOutElastic,
          property: `rotate`,
          from: -50,
          to: 0,
        },
      ],
    },
    snowflake1: {
      src: `snowflake.png`,
      width: 22.55,
      height: 22.12,
      top: 55.25,
      left: 55.26,
      rotate: 165,
      scaleY: -1,
      opacity: 0,
      animations: [
        {
          start: 2500,
          duration: 1000,
          easing: easing.linear,
          property: `opacity`,
          from: 0,
          to: 1,
        },
        {
          start: 2500,
          duration: 2000,
          easing: easing.easeInOutCubic,
          property: `translateY`,
          from: 0,
          to: -10,
          loop: true,
          isLoopReversed: true,
        }
      ]
    },
    snowflake2: {
      src: `snowflake.png`,
      width: 29.63,
      height: 29.07,
      top: 43.81,
      left: -1.91,
      rotate: -15,
      opacity: 0,
      animations: [
        {
          start: 2000,
          duration: 1000,
          easing: easing.linear,
          property: `opacity`,
          from: 0,
          to: 1,
        },
        {
          start: 2000,
          duration: 2000,
          easing: easing.easeInOutCubic,
          property: `translateY`,
          from: 0,
          to: -10,
          loop: true,
          isLoopReversed: true,
        }
      ]
    },
  };

  await canvasManager.loadImages(OBJECTS);
  requestAnimationFrame(canvasManager.animate);
  // Object.values(OBJECTS).forEach((obj) => {
  //   canvasManager.draw(obj);
  // });
};
