import {loadImages} from "./canvas";

let ww = window.innerWidth;
let wh = window.innerHeight;
let frame = {};

function setFrame() {
  const frameSize = Math.min(window.innerWidth, window.innerHeight);
  const frameX = (window.innerWidth - frameSize) / 2;
  const frameY = (window.innerHeight - frameSize) / 2;
  frame = {
    width: frameSize,
    height: frameSize,
    top: frameX / window.innerHeight,
    left: frameY / window.innerWidth,
    x: frameX,
    y: frameY,
  };
}

const canvasElement = document.getElementById(`result1-canvas`);
const ctx = canvasElement.getContext(`2d`);

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

function draw(obj) {
  let width = frame.width * (obj.width / 100);
  let height = frame.width * (obj.width / 100) * obj.ratio;
  let y = frame.height * (obj.top / 100) + frame.y;
  let x = frame.width * (obj.left / 100) + frame.x;
  ctx.save();

  if (obj.transforms.scaleX) {
    width *= obj.transforms.scaleX;

    if (obj.transforms.scaleX < 0) {
      ctx.scale(-1, 1);

      x = -x;
    }
  }

  if (obj.transforms.scaleY) {
    height *= obj.transforms.scaleY;

    if (obj.transforms.scaleY < 0) {
      ctx.scale(1, -1);

      y = -y;
    }
  }

  if (obj.transforms.rotate) {
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate((obj.transforms.rotate * Math.PI) / 180);
    ctx.translate(0 - x - width / 2, 0 - y - height / 2);
  }

  ctx.drawImage(obj.img, x, y, width, height);
  ctx.restore();
}

function updateSize() {
  setFrame();
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;
  ctx.strokeRect(frame.x, frame.y, frame.width, frame.height);
}

export default async () => {
  // window.addEventListener(`resize`, updateSize);
  updateSize();
  await loadImages(OBJECTS);
  Object.values(OBJECTS).forEach((obj) => {
    draw(obj);
  });
};

