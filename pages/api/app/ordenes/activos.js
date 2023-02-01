import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import ordenComponent from 'serverTools/components/orden';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  let salida = {};

  try {
    const ordenes = await ordenComponent.getOrdenActivos();

    if (ordenes.rows.length > 0) salida = ordenes.rows;

    logger(req);
    res.send(salida);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
