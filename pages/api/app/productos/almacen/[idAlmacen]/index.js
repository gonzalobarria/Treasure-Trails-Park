import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import productoComponent from 'serverTools/components/producto';
import { errorDB, getID, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    let { idAlmacen } = req.query;

    try {
      const productosAlmacen = await productoComponent.getProductosAlmacen(req);

      logger(req);
      res.send(productosAlmacen);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  })
  .patch(async (req, res) => {
    const { idAlmacen } = req.query;
    const { action } = req.body;

    try {
      switch (action) {
        case 'delete':
          await productoComponent.delProductoAlmacen(req);
          break;

        case 'update':
          await productoComponent.updProductoAlmacen(req);
          break;

        default:
          break;
      }

      const productos = await productoComponent.getProductosAlmacen(
        getID(idAlmacen)
      );

      logger(req);
      res.send(productos);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
