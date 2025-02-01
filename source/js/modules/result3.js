import CanvasManager from "./canvas-manager";
import easing from "./easing";

export default async () => {
  class ResultCanvas extends CanvasManager {
    constructor(opt) {
      super(opt);

      const stuffScalingTime = 1000;
      const keyScalingTime = stuffScalingTime * 0.8;
      const stuffFlyingTime = stuffScalingTime * 1.5;
      const stuffFallingTime = 1500;
      const crocodileMovingTime = stuffFallingTime * 1.5;
      const tearStartTime = stuffFlyingTime + crocodileMovingTime;
      const tearAppearTime = 1000;
      const tearFallingTime = 1500;
      const tearPauseTime = 500;

      this.objects = {
        key: {
          src: `prize-2-key.png`,
          width: 22.3,
          height: 37.9,
          top: 38.1,
          left: 38.7,
          rotate: 0,
          animations: [
            {
              start: 0,
              duration: keyScalingTime,
              easing: easing.easeOutCubic,
              property: `scaleX`,
              from: 0,
              to: 1,
            },
            {
              start: 0,
              duration: keyScalingTime,
              easing: easing.easeOutCubic,
              property: `scaleY`,
              from: 0,
              to: 1,
            },
            {
              start: 0,
              duration: keyScalingTime,
              easing: easing.easeOutCubic,
              property: `translateX`,
              from: 22.3 / 2,
              to: 0,
            },
            {
              start: 0,
              duration: keyScalingTime,
              easing: easing.easeOutCubic,
              property: `translateY`,
              from: 37.9 / 2,
              to: 0,
            }
          ],
        },
        crocodile: {
          src: `prize-2-crocodile.png`,
          width: 97,
          height: 97.4,
          top: 14.8,
          left: 0,
          rotate: 0,
          translateX: 43,
          translateY: -14,
          draw: () => this.drawCrocodile(),
          animations: [
            {
              start: stuffFlyingTime,
              duration: crocodileMovingTime,
              easing: easing.easeOutCubic,
              property: `translateX`,
              from: 43,
              to: 0,
            },
            {
              start: stuffFlyingTime,
              duration: crocodileMovingTime,
              easing: easing.easeOutCubic,
              property: `translateY`,
              from: -14,
              to: 0,
            },
          ],
        },
        drop: {
          src: `prize-2-drop.png`,
          width: 4.9,
          height: 7.4,
          top: 64.1,
          left: 43.6,
          rotate: 0,
          scaleX: 0,
          scaleY: 0,
          animations: [
            {
              start: tearStartTime,
              delay: tearFallingTime + tearPauseTime,
              duration: tearAppearTime,
              easing: easing.easeOutCubic,
              property: `scaleX`,
              from: 0,
              to: 1,
              loop: true,
            },
            {
              start: tearStartTime,
              delay: tearFallingTime + tearPauseTime,
              duration: tearAppearTime,
              easing: easing.easeOutCubic,
              property: `scaleY`,
              from: 0,
              to: 1,
              loop: true,
            },
            {
              start: tearStartTime,
              delay: tearFallingTime + tearPauseTime,
              duration: tearAppearTime,
              easing: easing.easeOutCubic,
              property: `translateX`,
              from: 4.9 / 2,
              to: 0,
              loop: true,
            },
            {
              start: tearStartTime,
              delay: tearFallingTime + tearPauseTime,
              duration: tearAppearTime,
              easing: easing.easeOutCubic,
              property: `opacity`,
              from: 1,
              to: 1,
              loop: true,
            },

            {
              start: tearStartTime + tearAppearTime,
              delay: tearPauseTime + tearAppearTime,
              duration: tearFallingTime,
              easing: easing.easeInCubic,
              property: `translateY`,
              from: 0,
              to: 10,
              loop: true,
            },
            {
              start: tearStartTime + tearAppearTime + tearFallingTime / 3 * 2,
              delay: tearPauseTime + tearAppearTime + tearFallingTime / 3 * 2,
              duration: tearFallingTime / 3,
              easing: easing.easeInCubic,
              property: `opacity`,
              from: 1,
              to: 0,
              loop: true,
            },

            {
              start: tearStartTime + tearAppearTime + tearFallingTime,
              delay: tearAppearTime + tearFallingTime,
              duration: tearPauseTime,
              easing: easing.linear,
              property: `translateY`,
              from: 10,
              to: 0,
              loop: true,
            },
          ],
        },
        flamingo: {
          src: `prize-2-flamingo.png`,
          width: 20.3,
          height: 20.4,
          top: 39.1,
          left: 12.6,
          rotate: 0,
          animations: [
            {
              start: 0,
              duration: stuffScalingTime,
              easing: easing.easeOutCubic,
              property: `scaleX`,
              from: 0,
              to: 1,
            },
            {
              start: 0,
              duration: stuffScalingTime,
              easing: easing.easeOutCubic,
              property: `scaleY`,
              from: 0,
              to: 1,
            },
            {
              start: 0,
              duration: stuffFlyingTime,
              easing: easing.easeOutCubic,
              property: `translateX`,
              from: 20.3 + 17,
              to: 0,
            },
            {
              start: 0,
              duration: stuffFlyingTime,
              easing: easing.easeOutCubic,
              property: `translateY`,
              from: 10.2,
              to: 0,
            },
            {
              start: stuffFlyingTime,
              duration: stuffFallingTime,
              easing: easing.easeInBack,
              property: `translateY`,
              from: 0,
              to: 60,
            }
          ],
        },
        leaf: {
          src: `prize-2-leaf.png`,
          width: 23.1,
          height: 23.1,
          top: 29.4,
          left: 84.1,
          rotate: 0,
          animations: [
            {
              start: 0,
              duration: stuffScalingTime,
              easing: easing.easeOutCubic,
              property: `scaleX`,
              from: 0,
              to: 1,
            },
            {
              start: 0,
              duration: stuffScalingTime,
              easing: easing.easeOutCubic,
              property: `scaleY`,
              from: 0,
              to: 1,
            },
            {
              start: 0,
              duration: stuffFlyingTime,
              easing: easing.easeOutCubic,
              property: `translateX`,
              from: -34.2,
              to: 0,
            },
            {
              start: 0,
              duration: stuffFlyingTime,
              easing: easing.easeOutCubic,
              property: `translateY`,
              from: 20,
              to: 0,
            },
            {
              start: stuffFlyingTime * 1.1,
              duration: stuffFallingTime,
              easing: easing.easeInBack,
              property: `translateY`,
              from: 0,
              to: 90,
            },
          ],
        },
        saturn: {
          src: `prize-2-saturn.png`,
          width: 18,
          height: 18.1,
          top: 71.1,
          left: 85.1,
          rotate: 0,
          animations: [
            {
              start: 0,
              duration: stuffScalingTime,
              easing: easing.easeOutCubic,
              property: `scaleX`,
              from: 0,
              to: 1,
            },
            {
              start: 0,
              duration: stuffScalingTime,
              easing: easing.easeOutCubic,
              property: `scaleY`,
              from: 0,
              to: 1,
            },
            {
              start: 0,
              duration: stuffFlyingTime,
              easing: easing.easeOutCubic,
              property: `translateX`,
              from: -35.2,
              to: 0,
            },
            {
              start: 0,
              duration: stuffFlyingTime,
              easing: easing.easeOutCubic,
              property: `translateY`,
              from: -21.1,
              to: 0,
            },
            {
              start: stuffFlyingTime * 1.3,
              duration: stuffFallingTime,
              easing: easing.easeInBack,
              property: `translateY`,
              from: 0,
              to: 60,
            }
          ],
        },
        snowflake: {
          src: `prize-2-snowflake.png`,
          width: 15.1,
          height: 15,
          top: 52.5,
          left: 66.9,
          rotate: 0,
          animations: [
            {
              start: 0,
              duration: stuffScalingTime,
              easing: easing.easeOutCubic,
              property: `scaleX`,
              from: 0,
              to: 1,
            },
            {
              start: 0,
              duration: stuffScalingTime,
              easing: easing.easeOutCubic,
              property: `scaleY`,
              from: 0,
              to: 1,
            },
            {
              start: 0,
              duration: stuffFlyingTime,
              easing: easing.easeOutCubic,
              property: `translateX`,
              from: -17,
              to: 0,
            },
            {
              start: 0,
              duration: stuffFlyingTime,
              easing: easing.easeOutCubic,
              property: `translateY`,
              from: -2.5,
              to: 0,
            },
            {
              start: stuffFlyingTime * 1.4,
              duration: stuffFallingTime,
              easing: easing.easeInBack,
              property: `translateY`,
              from: 0,
              to: 60,
            }
          ],
        },
        watermelon: {
          src: `prize-2-watermelon.png`,
          width: 17.7,
          height: 17.8,
          top: 61.3,
          left: -13.3,
          rotate: 0,
          animations: [
            {
              start: 0,
              duration: stuffScalingTime,
              easing: easing.easeOutCubic,
              property: `scaleX`,
              from: 0,
              to: 1,
            },
            {
              start: 0,
              duration: stuffScalingTime,
              easing: easing.easeOutCubic,
              property: `scaleY`,
              from: 0,
              to: 1,
            },
            {
              start: 0,
              duration: stuffFlyingTime,
              easing: easing.easeOutCubic,
              property: `translateX`,
              from: 17.7 + 45.5,
              to: 0,
            },
            {
              start: 0,
              duration: stuffFlyingTime,
              easing: easing.easeOutCubic,
              property: `translateY`,
              from: -11.3,
              to: 0,
            },
            {
              start: stuffFlyingTime,
              duration: stuffFallingTime * 1.2,
              easing: easing.easeInBack,
              property: `translateY`,
              from: 0,
              to: 60,
            }
          ],
        },
      };
    }

    drawCrocodile() {
      const keyHole = this.objects.key;

      const keyholeTop = this.frame.height * (keyHole.top / 100);
      const keyholeLeft = this.frame.width * (keyHole.left / 100);
      const keyholeWidth = this.frame.width * (keyHole.width / 100);
      const keyholeHeight = this.frame.height * (keyHole.height / 100);

      const keyholeRadius = keyholeWidth / 2;
      const keyholeCenterX = keyholeLeft + keyholeRadius;
      const keyholeCenterY = keyholeTop + keyholeRadius;

      const keyholeEdgeX = keyholeCenterX + keyholeRadius;
      const keyholeEdgeY = keyholeTop + keyholeHeight;

      this.ctx.save();

      this.ctx.beginPath();
      this.ctx.moveTo((this.frame.width - this.canvasElement.width) / 2, keyholeTop);
      this.ctx.arc(keyholeCenterX, keyholeCenterY, keyholeRadius, (Math.PI / 180) * (-90), (Math.PI / 180) * 46);
      this.ctx.lineTo(keyholeEdgeX, keyholeEdgeY);
      this.ctx.lineTo(keyholeEdgeX, this.frame.height + (this.canvasElement.height - this.frame.height) / 2);
      this.ctx.lineTo((this.frame.width - this.canvasElement.width) / 2, this.frame.height + (this.canvasElement.height - this.frame.height) / 2);
      this.ctx.closePath();
      this.ctx.clip();

      this.drawImage(this.objects.crocodile);

      this.ctx.restore();
    }
  }

  const canvasManager = new ResultCanvas({
    canvas: document.getElementById(`result2-canvas`),
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

  await canvasManager.loadImages();
  requestAnimationFrame(canvasManager.animate);
};
