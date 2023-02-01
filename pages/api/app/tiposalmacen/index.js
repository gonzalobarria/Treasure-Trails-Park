import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import tipoAlmacenComponent from 'serverTools/components/tipos_almacen';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  try {
    const tiposAlmacen = await tipoAlmacenComponent.getTiposAlmacen();

    logger(req);
    res.send(tiposAlmacen);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
