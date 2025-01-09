export default (wholeTime, timerElement) => {
  const startTimeStamp = Date.now();
  const INTERVAL = 1000;
  let now = startTimeStamp;
  let then = startTimeStamp;
  let elapsed = 0;

  function draw() {
    const secondsLast = Math.max(0, Math.ceil((wholeTime - (Date.now() - startTimeStamp)) / 1000));
    const hours = Math.floor(secondsLast / 3600);
    const minutes = Math.floor((secondsLast % 3600) / 60);
    const seconds = secondsLast % 60;

    function formateToString(number) {
      return number.toString().padStart(2, `0`);
    }

    const timerText = `${hours > 0 ? formateToString(hours) + `:` : ``}${formateToString(minutes)}:${formateToString(seconds)}`;
    timerElement.innerHTML = timerText;
  }

  function tick() {
    if (now - startTimeStamp > wholeTime) {
      return;
    }

    // отправляем на отрисовку следующий кадр
    requestAnimationFrame(tick);

    // проверяем, сколько времени прошло с предыдущего запуска
    now = Date.now();
    elapsed = now - then;

    // проверяем, достаточно ли прошло времени с предыдущей отрисовки кадра
    if (elapsed > INTERVAL) {
      // сохранение времени текущей отрисовки кадра
      then = now - (elapsed % INTERVAL);

      // запуск функции отрисовки
      draw();
    }
  }

  draw();
  tick();
};
