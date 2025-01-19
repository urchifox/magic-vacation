export default class CanvasManager {
  constructor(opt) {
    this.canvasElement = opt.canvas;
    this.ctx = this.canvasElement.getContext(`2d`);
    this.canvasSizeGetter = opt.canvasSizeGetter;
    this.updateSize();
    this.frame = opt.frame;
  }

  set frame(frameSize) {
    this.frameW = frameSize.width;
    this.frameH = frameSize.height;

    this.ctx.translate(this.frame.x, this.frame.y);
    this.ctx.strokeRect(0, 0, this.frame.width, this.frame.height);
  }

  get frame() {
    return {
      width: this.frameW,
      height: this.frameH,
      x: (window.innerWidth - this.frameW) / 2,
      y: (window.innerHeight - this.frameH) / 2,
    };
  }

  updateSize() {
    this.canvasElement.width = this.canvasSizeGetter().width;
    this.canvasElement.height = this.canvasSizeGetter().height;
  }

  async loadImages(data) {
    const promises = Object.values(data).map((obj) => {
      return new Promise((resolve, reject) => {
        if (!obj.src) {
          reject();
        }

        const img = new Image();

        img.addEventListener(`load`, () => {
          obj.img = img;
          obj.ratio = img.height / img.width;
          resolve();
        });

        img.addEventListener(`error`, () => {
          reject(new Error(`Failed to load image: ${obj.src}`));
        });

        img.src = `img/${obj.src}`;
      });
    });

    await Promise.all(promises);
  }

  draw(obj) {
    let width = this.frame.width * (obj.width / 100);
    let height = this.frame.width * (obj.width / 100) * obj.ratio;
    let y = this.frame.height * (obj.top / 100);
    let x = this.frame.width * (obj.left / 100);
    this.ctx.save();

    if (obj.transforms.scaleX) {
      width *= obj.transforms.scaleX;

      if (obj.transforms.scaleX < 0) {
        this.ctx.scale(-1, 1);

        x = -x;
      }
    }

    if (obj.transforms.scaleY) {
      height *= obj.transforms.scaleY;

      if (obj.transforms.scaleY < 0) {
        this.ctx.scale(1, -1);

        y = -y;
      }
    }

    if (obj.transforms.rotate) {
      this.ctx.translate(x + width / 2, y + height / 2);
      this.ctx.rotate((obj.transforms.rotate * Math.PI) / 180);
      this.ctx.translate(0 - x - width / 2, 0 - y - height / 2);
    }

    this.ctx.drawImage(obj.img, x, y, width, height);
    this.ctx.restore();
  }
}
