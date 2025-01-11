export default (element, textArray, fps) => {
  const UPDATE_INTERVAL = 1000 / fps;
  const startTimestamp = performance.now();
  let lastUpdateTimestamp = startTimestamp;
  let currentIndex = 0;

  function updateTextContent(index) {
    element.textContent = textArray[index];
  }

  function tick(currentTimestamp) {
    if (currentIndex >= textArray.length - 1) {
      updateTextContent(textArray.length - 1);
      return;
    }

    if (currentTimestamp - lastUpdateTimestamp >= UPDATE_INTERVAL) {
      lastUpdateTimestamp = currentTimestamp;
      currentIndex++;
      updateTextContent(currentIndex);
    }

    requestAnimationFrame(tick);
  }

  updateTextContent(currentIndex);
  requestAnimationFrame(tick);
};
