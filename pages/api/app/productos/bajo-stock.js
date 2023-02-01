import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import productoComponent from 'serverTools/components/producto';
import { logger, sendErrorFE } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  try {
    const productos = await productoComponent.getProductosBajoStock(req);

    logger(req);
    res.json(productos);
  } catch (error) {
    sendErrorFE({ req, res, error });
  }
});

export default handler;
