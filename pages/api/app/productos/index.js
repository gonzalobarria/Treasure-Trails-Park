import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import productoComponent from 'serverTools/components/producto';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    try {
      const productos = await productoComponent.getProductos(req);

      logger(req);
      res.json(productos);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  })
  .post(async (req, res) => {
    try {
      const cantProductos = await productoComponent.checkProducto(req);
      const salida = {};

      if (cantProductos === 0)
        salida.insercion = await productoComponent.insProducto(req);
      else salida.errorMsg = 'error.producto-duplicado';

      logger(req);
      res.send(salida);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
