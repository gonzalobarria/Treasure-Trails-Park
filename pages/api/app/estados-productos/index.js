import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import estadosProductoComponent from 'serverTools/components/estado_producto';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  let salida = {};

  try {
    const estadosProductos =
      await estadosProductoComponent.getEstadosProductos();

    if (estadosProductos.rows.length > 0) salida = estadosProductos.rows;

    logger(req);
    res.send(salida);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
