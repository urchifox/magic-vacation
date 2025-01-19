export async function loadImages(data) {
  const promises = Object.values(data).map((obj) => {
    return new Promise((resolve, reject) => {
      if (!obj.src) {
        reject();
      }

      const img = new Image();

      img.addEventListener(`load`, () => {
        obj.img = img;
        obj.ratio = img.height / img.width;
        resolve();
      });

      img.addEventListener(`error`, () => {
        reject(new Error(`Failed to load image: ${obj.src}`));
      });

      img.src = `img/${obj.src}`;
    });
  });

  await Promise.all(promises);
}
