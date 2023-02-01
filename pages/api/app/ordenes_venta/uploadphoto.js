import auth from 'middleware/auth';
import multer from 'multer';
import nextConnect from 'next-connect';
import ordenVentaComponent from 'serverTools/components/orden_venta';
const { sendUploadToGCS } = require('serverTools/utils/upload');
import { logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .use(multer().array('imgCollection'))
  .use(sendUploadToGCS)
  .post(async (req, res, next) => {
    await ordenVentaComponent.updPhotoOrdenVenta(req);

    const orden = await ordenVentaComponent.getOrdenVenta(req);

    logger(req);
    res.send(orden);
  });

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};