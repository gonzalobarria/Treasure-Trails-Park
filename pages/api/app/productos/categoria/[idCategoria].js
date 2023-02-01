import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import productoComponent from 'serverTools/components/producto';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  try {
    const productosCategoria = await productoComponent.getProductosCategoria(
      req
    );

    logger(req);
    res.send(productosCategoria);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
