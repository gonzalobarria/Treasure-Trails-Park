import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import clienteComponent from 'serverTools/components/cliente';
import productoComponent from 'serverTools/components/producto';
import { ERROR_CODES } from 'serverTools/utils/enums';
import { errorDB, logger, sendErrorFE } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    try {
      const clientes = await clienteComponent.getProductosCliente(req);

      logger(req);
      res.send(clientes);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  })
  .post(async (req, res) => {
    try {
      await productoComponent.insProductoCliente(req);

      logger(req);
      res.json({ msg: 'Realizado con éxito' });
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

        case 'addCreate':
          try {
            await productoComponent.addCreateProductoCliente(req);
          } catch (error) {
            if (error.code === '23505') {
              throw new Error(`${ERROR_CODES[error.code]}-producto`);
            }
            throw error;
          }
          break;

        default:
          break;
      }

      logger(req);
      res.json({ msg: 'Realizado con éxito' });
    } catch (error) {
      sendErrorFE({ req, res, error });
    }
  });

export default handler;
