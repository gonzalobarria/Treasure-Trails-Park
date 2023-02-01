import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import ordenComponent from 'serverTools/components/orden';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    try {
      const orden = await ordenComponent.getOrden(req);

      logger(req);
      res.send(orden);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  })
  .put(async (req, res) => {
    let { idOrden } = req.query;

    try {
      const { rowCount } = await ordenComponent.updOrden(
        getID(idOrden),
        req.body
      );

      let mensaje;
      switch (rowCount) {
        case 1:
          mensaje = { message: 'Orden Actualizada' };
          break;
        default:
          mensaje = { message: 'Warning: Orden NO actualizada' };
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
