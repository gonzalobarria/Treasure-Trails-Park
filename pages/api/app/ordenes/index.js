import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import ordenComponent from 'serverTools/components/orden';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    try {
      const ordenes = await ordenComponent.getOrdenes(req);

      logger(req);
      res.send(ordenes);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  })
  .post(async (req, res) => {
    try {
      await ordenComponent.insOrden(req);

      logger(req);
      res.json({ msg: 'Realizado con éxito' });
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
