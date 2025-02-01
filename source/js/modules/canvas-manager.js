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
    // this.ctx.strokeRect(0, 0, this.frame.width, this.frame.height);
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

  async loadImages() {
    const promises = Object.values(this.objects).map((obj) => {
      return new Promise((resolve, reject) => {
        if (!obj.src) {
          resolve();
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

  drawImage(obj) {
    let width = this.frame.width * (obj.width / 100);
    let height = this.frame.height * (obj.width / 100) * obj.ratio;
    let y = this.frame.height * (obj.top / 100);
    let x = this.frame.width * (obj.left / 100);
    this.ctx.save();

    if (obj.translateX !== undefined) {
      x += this.frameW * (obj.translateX / 100);
    }

    if (obj.translateY !== undefined) {
      y += this.frameH * (obj.translateY / 100);
    }

    if (obj.scaleX !== undefined) {
      width *= obj.scaleX;

      if (obj.scaleX < 0) {
        this.ctx.scale(-1, 1);

        x = -x;
      }
    }

    if (obj.scaleY !== undefined) {
      height *= obj.scaleY;

      if (obj.scaleY < 0) {
        this.ctx.scale(1, -1);

        y = -y;
      }
    }

    if (obj.rotate !== undefined) {
      this.ctx.translate(x + width / 2, y + height / 2);
      this.ctx.rotate((obj.rotate * Math.PI) / 180);
      this.ctx.translate(0 - x - width / 2, 0 - y - height / 2);
    }

    if (obj.opacity !== undefined) {
      this.ctx.globalAlpha = obj.opacity;
    }

    this.ctx.drawImage(obj.img, x, y, width, height);
    this.ctx.restore();
  }

  runAnimations(obj, deltaTime) {
    obj.animations.forEach((anim) => {
      const elapsed = deltaTime - anim.start;
      if (elapsed > anim.duration && anim.loop) {
        anim.start += anim.duration + (anim.delay ? anim.delay : 0);

        if (anim.isLoopReversed) {
          const startState = anim.from;
          const finalState = anim.to;

          anim.from = finalState;
          anim.to = startState;
        }
      }
      if (elapsed >= 0 && elapsed <= anim.duration) {
        const progress = anim.easing(elapsed / anim.duration);
        obj[anim.property] = anim.from + (anim.to - anim.from) * progress;
      }
    });
  }

  animate(currentTime) {
    const deltaTime = currentTime - this.startTime;

    // Обновляем состояние всех объектов
    Object.values(this.objects).forEach((obj) => {
      if (!obj.animations) {
        return;
      }
      this.runAnimations(obj, deltaTime);
    });

    // Очищаем холст и перерисовываем объекты
    this.ctx.clearRect(
        (this.frame.width - this.canvasElement.width) / 2,
        (this.frame.height - this.canvasElement.height) / 2,
        this.canvasElement.width,
        this.canvasElement.height
    );

    Object.values(this.objects).forEach((obj) => {
      if (`draw` in obj && typeof obj.draw === `function`) {
        obj.draw();
      } else if (`img` in obj) {
        this.drawImage(obj);
      }
    });

    requestAnimationFrame(this.animate);
  }
}
