import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import almacenComponent from 'serverTools/components/almacen';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  try {
    const almacenesNoEstaProducto =
      await almacenComponent.getAlmacenesNoEstaProducto(req);

    logger(req);
    res.send(almacenesNoEstaProducto);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
