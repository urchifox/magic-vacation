import throttle from 'lodash/throttle';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 1000;
    this.scrollFlag = true;
    this.timeout = null;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
    this.prizesSeen = false;
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    if (this.scrollFlag) {
      this.reCalculateActiveScreenPosition(evt.deltaY);
      const currentPosition = this.activeScreen;
      if (currentPosition !== this.activeScreen) {
        this.changePageDisplay();
      }
    }
    this.scrollFlag = false;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.scrollFlag = true;
    }, this.THROTTLE_TIMEOUT);
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.changeTheme();
    this.emitChangeDisplayEvent();
    // without this timeout the animation works wrong in firefox
    setTimeout(() => {
      this.runSvgAnimation();
    }, 1);
  }

  changeVisibilityDisplay() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    setTimeout(() => {
      this.screenElements[this.activeScreen].classList.add(`active`);
    }, 100);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  changeTheme() {
    if (this.screenElements[this.activeScreen].id !== `story`) {
      document.body.dataset.theme = ``;
      return;
    }

    const sliderItems = document.querySelectorAll(`.swiper-wrapper .slider__item`);
    const activeIndex = Array.from(sliderItems).findIndex((item) =>
      item.classList.contains(`swiper-slide-active`)
    );

    document.body.dataset.theme = activeIndex === -1
      ? `1`
      : (Math.floor(activeIndex / 2) + 1).toString();
  }

  runSvgAnimation() {
    if (this.screenElements[this.activeScreen].id === `prizes` && !this.prizesSeen) {
      const svgObject = document.querySelector(`#prize1svg`);

      const runAnimaion = (svgContent) => {
        const startAnimation = svgContent.getElementById(`start`);
        if (startAnimation) {
          startAnimation.beginElement();
          this.prizesSeen = true;
        } else {
          setListener();
        }
      };

      const setListener = () => {
        svgObject.addEventListener(`load`, function () {
          const svgContent = svgObject.contentDocument;
          if (svgContent) {
            runAnimaion(svgContent);
          }
        });
      };

      const svgContent = svgObject.contentDocument;

      if (!svgContent) {
        setListener();
      } else {
        runAnimaion(svgContent);
      }
    }
  }


  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
