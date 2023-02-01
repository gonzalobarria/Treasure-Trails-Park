import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import clienteComponent from 'serverTools/components/cliente';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  try {
    const ordenesVenta = await clienteComponent.getOrdenesVenta(req);

    logger(req);
    res.send(ordenesVenta);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
