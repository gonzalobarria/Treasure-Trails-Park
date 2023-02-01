import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import productoComponent from 'serverTools/components/producto';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .post(async (req, res) => {
    try {
      const producto = await productoComponent.checkProductoOrden(req);
      if (producto.rowCount === 0) {
        await productoComponent.insProductoOrden(req);
      }

      const productos = await productoComponent.getProductosOrden(req);
      if (producto.rowCount > 0) {
        productos.errorMsg = 'error.producto-duplicado';
      }

      logger(req);
      res.json(productos);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  })
  .patch(async (req, res) => {
    const { action } = req.body;

    try {
      switch (action) {
        case 'delete':
          await productoComponent.delProductoOrden(req);
          break;

        case 'update':
          await productoComponent.updProductoOrden(req);
          break;

        default:
          break;
      }

      const productos = await productoComponent.getProductosOrden(req);

      logger(req);
      res.send(productos);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
