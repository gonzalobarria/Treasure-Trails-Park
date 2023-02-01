import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import almacenComponent from 'serverTools/components/almacen';
import { TIPOS_ALMACEN } from 'serverTools/utils/enums';
import { logger, sendErrorFE } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    try {
      const almacenes = await almacenComponent.getAlmacenes(req);

      logger(req);
      res.send(almacenes);
    } catch (error) {
      sendErrorFE({ req, res, error });
    }
  })
  .post(async (req, res) => {
    try {
      const { rowCount } = await almacenComponent.checkAlmacen(req);
      const { idTipoAlmacen } = req.body;
      const { BODEGA, LOCAL } = TIPOS_ALMACEN;

      if (rowCount === 1)
        switch (idTipoAlmacen) {
          case BODEGA:
            throw new Error('error.bodega-duplicada');
          case LOCAL:
            throw new Error('error.local-duplicado');
          default:
            throw new Error('Almacen duplicado');
        }

      const { rowCount: rc } = await almacenComponent.insAlmacen(req);

      if (rc === 0) throw new Error('Proceso no completado');

      logger(req);
      res.json({ msg: 'Realizado con éxito' });
    } catch (error) {
      sendErrorFE({ req, res, error });
    }
  });

export default handler;
