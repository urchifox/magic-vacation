export default class CanvasManager {
  constructor(opt) {
    this.canvasElement = opt.canvas;
    this.ctx = this.canvasElement.getContext(`2d`);
    this.canvasSizeGetter = opt.canvasSizeGetter;
    this.updateSize();
    this.frame = opt.frame;
    this.startTime = performance.now();
    // Привязка метода animate
    this.animate = this.animate.bind(this);
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
    this.objects = data;
  }

  draw(obj) {
    let width = this.frame.width * (obj.width / 100);
    let height = this.frame.width * (obj.width / 100) * obj.ratio;
    let y = this.frame.height * (obj.top / 100);
    let x = this.frame.width * (obj.left / 100);
    this.ctx.save();

    if (obj.transforms.translateX) {
      x += this.size * (obj.transforms.translateX / 100);
    }

    if (obj.transforms.translateY) {
      y += this.size * (obj.transforms.translateY / 100);
    }

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

    if (obj.opacity) {
      this.ctx.globalAlpha = obj.opacity;
    }

    this.ctx.drawImage(obj.img, x, y, width, height);
    this.ctx.restore();
  }

  animate(currentTime) {
    const deltaTime = currentTime - this.startTime;

    // Обновляем состояние всех объектов
    Object.values(this.objects).forEach((obj) => {
      if (!obj.animations) {
        return;
      }
      obj.animations.forEach((anim) => {
        const elapsed = deltaTime - anim.start;
        if (elapsed >= 0 && elapsed <= anim.duration) {
          const progress = anim.easing(elapsed / anim.duration);
          obj[anim.property] = anim.from + (anim.to - anim.from) * progress;
        }
      });
    });

    // Очищаем холст и перерисовываем объекты
    this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    Object.values(this.objects).forEach((obj) => this.draw(obj));

    requestAnimationFrame(this.animate);
  }
}
