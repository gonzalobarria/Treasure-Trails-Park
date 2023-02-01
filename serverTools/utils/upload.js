import storage from './storage';
import { getTimestampNow } from './utiles';

export function sendUploadToGCS(req, res, next) {
  const {
    files,
    body: { folder },
  } = req;
  if (!files) return next();

  let promises = [];

  const bucket = storage.bucket(process.env.BUCKETNAME);

  files.forEach((image, index) => {
    const gcsname = `${folder}/${getTimestampNow()}.jpg`;
    const file = bucket.file(gcsname);

    const promise = new Promise((resolve, reject) => {
      const stream = file.createWriteStream({
        metadata: {
          contentType: image.mimetype,
        },
      });

      stream.on('error', (err) => {
        files[index].cloudStorageError = err;
        reject(err);
      });

      stream.on('finish', async () => {
        try {
          files[index].cloudStorageObject = gcsname;
          await file.makePublic();

          const pubURL = `${process.env.BUCKETURI}/${process.env.BUCKETNAME}/${gcsname}`;
          files[index].cloudStoragePublicUrl = pubURL;
          resolve();
        } catch (error) {
          reject(error);
        }
      });

      stream.end(image.buffer);
    });

    promises.push(promise);
  });

  Promise.all(promises)
    .then((_) => {
      promises = [];
      next();
    })
    .catch(next);
}
