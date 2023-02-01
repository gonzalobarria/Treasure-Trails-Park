import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import ordenVentaComponent from 'serverTools/components/orden_venta';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  try {
    const { rows } = await ordenVentaComponent.buscaOrdenVenta(req.body);

    logger(req);
    res.json(rows);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
