import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import ordenVentaComponent from 'serverTools/components/orden_venta';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    try {
      const ordenesVenta = await ordenVentaComponent.getOrdenesVenta(req);

      logger(req);
      res.send(ordenesVenta);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  })
  .post(async (req, res) => {
    try {
      await ordenVentaComponent.insOrdenVenta(req);

      logger(req);
      res.json({ msg: 'Realizado con Éxito' });
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
