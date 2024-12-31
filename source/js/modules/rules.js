export default () => {
  document.querySelectorAll(`.rules__item`).forEach((child, index) => {
    child.style.setProperty(`--index`, index);
  });
};
