import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import tipoAlmacenComponent from 'serverTools/components/tipos_almacen';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  try {
    const almacenes = await tipoAlmacenComponent.getAlmacenesActivos(req);

    logger(req);
    res.send(almacenes);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
