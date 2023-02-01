import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import ordenVentaComponent from 'serverTools/components/orden_venta';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    try {
      const ordenesVentaSemanaMonto =
        await ordenVentaComponent.getOrdenesVentaSemanaMonto(req);

      logger(req);
      res.send(ordenesVentaSemanaMonto);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
