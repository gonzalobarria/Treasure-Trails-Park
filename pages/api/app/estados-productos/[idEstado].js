import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import estadosProductoComponent from 'serverTools/components/estado_producto';
import { errorDB, getID, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  let { idEstado } = req.query;
  let salida = {};
  idEstado = getID(idEstado);

  try {
    const estadoProducto = await estadosProductoComponent.getEstadoProducto(
      idEstado
    );

    if (estadoProducto.rows.length === 1) salida = estadoProducto.rows[0];

    logger(req);
    res.send(salida);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
