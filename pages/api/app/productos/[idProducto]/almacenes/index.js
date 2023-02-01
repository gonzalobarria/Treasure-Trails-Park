import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import almacenComponent from 'serverTools/components/almacen';
import productoComponent from 'serverTools/components/producto';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    try {
      const almacenesProducto = await almacenComponent.getAlmacenesProducto(
        req
      );

      logger(req);
      res.send(almacenesProducto);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  })
  .post(async (req, res) => {
    try {
      const producto = await productoComponent.checkProductoAlmacen(req);

      if (producto.rowCount > 0) throw new Error('Producto Duplicado');

      const cantProdInsertado = await productoComponent.insProductoAlmacen(req);

      logger(req);
      res.json({ cantProdInsertado });
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
