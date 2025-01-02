export default () => {
  const setAnimationProperties = (element, animationSettings) => {
    const words = element.textContent.split(` `);
    element.innerHTML = words.reduce((acc, word) => `${acc} <span>${word}</span>`, ``).trim();
    const wordsElements = element.children;

    let prevWholeDuration = animationSettings.commonDelay;

    for (let i = 0; i < wordsElements.length; i++) {
      const wordElement = wordsElements[i];
      const letters = wordElement.textContent.split(``);
      wordElement.innerHTML = letters.reduce((acc, letter) => `${acc}<span>${letter}</span>`, ``);
      const lettersElements = wordElement.children;

      const prevWord = wordsElements[i - 1];
      const prevWordWholeDuration = prevWord
        ? animationSettings.letterDuration + prevWord.children.length * animationSettings.letterDelay
        : 0;
      prevWholeDuration += prevWordWholeDuration;

      const possibleDelays = [...lettersElements].map((_, index) => prevWholeDuration + animationSettings.letterDelay * (index + 1));

      for (let j = 0; j < lettersElements.length; j++) {
        const letterElement = lettersElements[j];
        letterElement.style.setProperty(`--letter-duration`, animationSettings.letterDuration + `s`);
        const [delay] = possibleDelays.splice([Math.floor(Math.random() * possibleDelays.length)], 1);
        letterElement.style.setProperty(`--letter-delay`, delay + `s`);
      }
    }
  };

  setAnimationProperties(document.querySelector(`.intro__title`), {
    letterDuration: 0.3,
    letterDelay: 0.03,
    commonDelay: 0.6,
  });

  setAnimationProperties(document.querySelector(`.intro__date`), {
    letterDuration: 0.3,
    letterDelay: 0.03,
    commonDelay: 1.8
  });

  setAnimationProperties(document.querySelector(`.slider__item-title`), {
    letterDuration: 0.3,
    letterDelay: 0.03,
    commonDelay: 0
  });

  setAnimationProperties(document.querySelector(`.prizes__title`), {
    letterDuration: 0.3,
    letterDelay: 0.03,
    commonDelay: 0
  });

  setAnimationProperties(document.querySelector(`.rules__title`), {
    letterDuration: 0.3,
    letterDelay: 0.03,
    commonDelay: 0
  });

  setAnimationProperties(document.querySelector(`.game__title`), {
    letterDuration: 0.3,
    letterDelay: 0.03,
    commonDelay: 0
  });
};
