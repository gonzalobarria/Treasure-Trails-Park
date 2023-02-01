import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import ordenVentaComponent from 'serverTools/components/orden_venta';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    try {
      const orden = await ordenVentaComponent.getOrdenVenta(req);

      logger(req);
      res.send(orden);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  })
  .put(async (req, res) => {
    let { idOrdenVenta } = req.query;
    idOrdenVenta = getID(idOrdenVenta);

    try {
      const { rowCount } = await ordenVentaComponent.updOrdenVenta(
        idOrdenVenta,
        req.body
      );

      let mensaje;
      switch (rowCount) {
        case 1:
          mensaje = { message: 'Orden Venta Actualizada' };
          break;
        default:
          mensaje = { message: 'Warning: Orden Venta NO actualizada' };
          break;
      }

      logger(req);
      res.json(mensaje);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
