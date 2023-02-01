import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import almacenComponent from 'serverTools/components/almacen';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    try {
      const almacen = await almacenComponent.getAlmacen(req);

      logger(req);
      res.send(almacen);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  })
  .put(async (req, res) => {
    try {
      const { rowCount } = await almacenComponent.updAlmacen(req);

      if (rowCount !== 1)
        throw new Error('La actualización no pudo ser realizada');

      logger(req);
      res.json({ msg: 'Actualizado con éxito' });
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
