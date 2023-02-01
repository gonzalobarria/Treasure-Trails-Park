import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import ordenComponent from 'serverTools/components/orden';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).patch(async (req, res) => {
  try {
    await ordenComponent.updEstadoOrden(req);

    const orden = await ordenComponent.getOrden(req);

    logger(req);
    res.send(orden);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
