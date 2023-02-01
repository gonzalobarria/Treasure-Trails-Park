import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import clienteComponent from 'serverTools/components/cliente';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    try {
      const clientes = await clienteComponent.getClientesNegocio(req);

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
      const cliente = await clienteComponent.checkCliente(req);
      if (cliente.rowCount === 0) {
        await clienteComponent.insCliente(req);
      }

      const clientes = await clienteComponent.getClientesNegocio(req);
      if (cliente.rowCount > 0) {
        clientes.errorMsg = 'error.cliente-duplicado';
      }

      logger(req);
      res.send(clientes);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
