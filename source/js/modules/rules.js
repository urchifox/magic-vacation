export default () => {
  const rulesElements = document.querySelectorAll(`.rules__item`);
  rulesElements.forEach((child, index) => {
    child.style.setProperty(`--index`, index);
  });
  document.querySelector(`.rules__link`).style.setProperty(`--rules-number`, rulesElements.length.toString());
};
