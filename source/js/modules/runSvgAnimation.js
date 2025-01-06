export default (svgObject, delay) => {
  const runAnimaion = (svgContent) => {
    const startAnimation = svgContent.getElementById(`start`);
    if (startAnimation) {
      setTimeout(() => {
        startAnimation.beginElement();
      }, delay);
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
};
