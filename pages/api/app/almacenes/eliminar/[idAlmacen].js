import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import almacenComponent from 'serverTools/components/almacen';
import { errorDB, getID, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).patch(async (req, res) => {
  let { idAlmacen } = req.query;
  idAlmacen = getID(idAlmacen);

  try {
    const data = await almacenComponent.updEstadoAlmacen(idAlmacen, req.body);

    const almacenes = await almacenComponent.getAlmacenes(
      req,
      data.rows[0].id_tipo_almacen
    );

    logger(req);
    res.json(almacenes);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
