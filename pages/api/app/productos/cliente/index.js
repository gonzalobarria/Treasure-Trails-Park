import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import productoComponent from 'serverTools/components/producto';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).post(async (req, res) => {
  try {
    await productoComponent.insProductoCliente(req);

    const productos = await productoComponent.getProductosClienteNegocio(req);

    logger(req);
    res.json(productos);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
