export default (wholeTime, timerElement) => {
  if (typeof wholeTime !== `number` || wholeTime <= 0) {
    throw new Error(`Invalid \`wholeTime\`: must be a positive number.`);
  }

  const UPDATE_INTERVAL = 1000;
  const startTimestamp = performance.now();
  let lastUpdateTimestamp = startTimestamp;

  function formatToString(number) {
    return number.toString().padStart(2, `0`);
  }

  function draw(secondsLeft) {
    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    const timerText = `${hours > 0 ? formatToString(hours) + `:` : ``}${formatToString(minutes)}:${formatToString(seconds)}`;
    timerElement.innerHTML = timerText;
  }

  function tick(currentTimestamp) {
    const elapsedTime = currentTimestamp - startTimestamp;

    if (elapsedTime >= wholeTime) {
      draw(0);
      return;
    }

    if (currentTimestamp - lastUpdateTimestamp >= UPDATE_INTERVAL) {
      lastUpdateTimestamp = currentTimestamp;
      const secondsLeft = Math.max(0, Math.ceil((wholeTime - elapsedTime) / 1000));
      draw(secondsLeft);
    }

    requestAnimationFrame(tick);
  }

  draw(Math.max(0, Math.ceil(wholeTime / 1000)));
  requestAnimationFrame(tick);
};
