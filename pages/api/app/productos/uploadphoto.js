import auth from 'middleware/auth';
import multer from 'multer';
import nextConnect from 'next-connect';
import productoComponent from 'serverTools/components/producto';
const { sendUploadToGCS } = require('serverTools/utils/upload');
import { logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .use(multer().array('imgCollection'))
  .use(sendUploadToGCS)
  .post(async (req, res, next) => {
    const { rows } = await productoComponent.updPhotoProducto(req);

    let salida = '';
    if (rows.length === 1) salida = rows[0];

    logger(req);
    res.json(salida);
  });

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};