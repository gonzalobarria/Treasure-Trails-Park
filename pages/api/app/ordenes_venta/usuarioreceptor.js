import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import ordenVentaComponent from 'serverTools/components/orden_venta';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).patch(async (req, res) => {
  try {
    await ordenVentaComponent.updOrdenUsuarioReceptor(req);

    const ordenes = await ordenVentaComponent.getOrdenesVenta(req);

    logger(req);
    res.send(ordenes);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
