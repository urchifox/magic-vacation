export default {
  linear: (x) => {
    return x;
  },

  easeInOutCubic: (x) => {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  },

  easeInCubic: (x) => {
    return x * x * x;
  },

  easeOutCubic: (x) => {
    return 1 - Math.pow(1 - x, 3);
  },

  easeInExpo: (x) => {
    if (x === 0) {
      return 0;
    } else {
      return Math.pow(2, 10 * x - 10);
    }
  },

  easeOutExpo: (x) => {
    if (x === 1) {
      return 1;
    } else {
      return 1 - Math.pow(2, -10 * x);
    }
  },

  easeInElastic: (x) => {
    const c4 = (2 * Math.PI) / 3;

    if (x === 0) {
      return 0;
    } else if (x === 1) {
      return 1;
    } else {
      return Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
    }
  },

  easeOutElastic: (x) => {
    const c4 = (2 * Math.PI) / 3;

    if (x === 0) {
      return 0;
    } else if (x === 1) {
      return 1;
    } else {
      return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    }
  },

  easeInBack: (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return c3 * x * x * x - c1 * x * x;
  },

  easeOutBack: (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  },

  easeInOutBack: (x) => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;

    return x < 0.5
      ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  },

  sine: (t) => Math.sin(t * Math.PI * 2), // Синусоидальное движение
  sineDerivative: (t) => Math.cos(t * Math.PI * 2), // Производная синусоиды (для угла)
};
