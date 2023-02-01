import cacheData from 'memory-cache';
import sizeOf from 'image-size';
import storage from './storage';

const getBase64Img = async (url) => {
  try {
    const imageBuffer = await (await fetch(url)).buffer();
    return Buffer.from(imageBuffer).toString('base64');
  } catch (error) {
    throw error;
  }
};

const getImageData = async (imgURL) => {
  try {
    const base64Img = await getBase64Img(imgURL);
    const dataURI = `data:image/jpeg;base64,${base64Img}`;
    const img = Buffer.from(base64Img, 'base64');
    const { width, height } = sizeOf(img);

    return { dataURI, width, height };
  } catch (error) {
    throw error;
  }
};

const fetchWithCache = async (url) => {
  const value = cacheData.get(url);
  if (value) return value;

  const data = getImageData(url);
  cacheData.put(url, data);

  return data;
};

const getImgURL = (gscname) =>
  `${process.env.BUCKETURI}/${process.env.BUCKETNAME}/${encodeURIComponent(
    gscname
  )}`;

const getImagenes = async (files) => {
  const arregloImagenes = [];

  await Promise.all(
    files.map(async (file, indice) => {
      let salida = { indice };
      try {
        if (file !== '') {
          const sal = await fetchWithCache(getImgURL(file));
          salida = { ...salida, ...sal };
        }
      } catch (error) {
        console.log('error', error.message);
        salida = {};
      }

      arregloImagenes.push(salida);
    })
  );

  return arregloImagenes;
};

const base = {
  getBase64Img,
  getImageData,
  getImagenes,
};

export default base;
