import runSvgAnimation from "./runSvgAnimation";
import textChanger from "./text-changer";

export default ({
  numberElement,
  svgElement,
  delayForNumber,
  delayForSvg
}) => {
  const finalNumber = parseInt(numberElement.textContent, 10);

  if (typeof finalNumber === `number`) {
    const initialWidth = numberElement.clientWidth;
    numberElement.style.setProperty(`width`, `${initialWidth}px`);
    numberElement.textContent = 0;

    const startNumber = Math.pow(10, Math.floor(Math.log10(finalNumber)));
    const gap = Math.pow(10, Math.floor(Math.log10(finalNumber)));
    const array = Array.from({length: Math.floor((finalNumber - startNumber) / gap) + 1}, (_, i) => startNumber + i * gap);

    setTimeout(() => {
      textChanger(
          numberElement,
          array,
          12
      ).then(() => {
        numberElement.style.setProperty(`width`, ``);
      });
    }, delayForNumber);
  }

  runSvgAnimation(svgElement, delayForSvg);
};
