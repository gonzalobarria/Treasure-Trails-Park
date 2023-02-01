import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import ordenComponent from 'serverTools/components/orden';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  try {
    const ordenes = await ordenComponent.getOrdenesProveedor(req);

    logger(req);
    res.send(ordenes);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
