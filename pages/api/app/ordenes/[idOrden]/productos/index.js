import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import productoComponent from 'serverTools/components/producto';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    try {
      const productos = await productoComponent.getProductosOrden(req);

      logger(req);
      res.send(productos);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  })
  .post(async (req, res) => {
    try {
      const producto = await productoComponent.checkProductoOrden(req);

      if (producto.rowCount > 0) throw new Error('Producto Duplicado');

      const cantProdInsertado = await productoComponent.insProductoOrden(req);

      logger(req);
      res.json({ cantProdInsertado });
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

      logger(req);
      res.send({ msg: 'Realizado con éxito' });
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
