import auth from 'middleware/auth';
import multer from 'multer';
import nextConnect from 'next-connect';
import ordenComponent from 'serverTools/components/orden';
const { sendUploadToGCS } = require('serverTools/utils/upload');
import { logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .use(multer().array('imgCollection'))
  .use(sendUploadToGCS)
  .post(async (req, res, next) => {
    await ordenComponent.updPhotoProductoOrden(req);

    const orden = await ordenComponent.getOrden(req);

    logger(req);
    res.send(orden);
  });

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};