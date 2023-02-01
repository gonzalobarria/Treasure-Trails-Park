import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import productoComponent from 'serverTools/components/producto';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    try {
      const productosCliente =
        await productoComponent.getProductosClienteNegocio(req);

      logger(req);
      res.send(productosCliente);
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
          await productoComponent.delProductoCliente(req);
          break;

        case 'update':
          await productoComponent.updProductoCliente(req);
          break;

        default:
          break;
      }

      const productos = await productoComponent.getProductosClienteNegocio(req);
      logger(req);
      res.json(productos);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
