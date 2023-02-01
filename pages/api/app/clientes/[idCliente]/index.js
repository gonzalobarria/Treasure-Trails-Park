import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import clienteComponent from 'serverTools/components/cliente';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    let salida = {};

    try {
      const cliente = await clienteComponent.getClienteNegocio(req);

      if (cliente.rows.length === 1) salida = cliente.rows[0];

      logger(req);
      res.send(salida);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  })
  .put(async (req, res) => {
    let salida = {};
    try {
      const cliente = await clienteComponent.updCliente(req);

      const clientes = await clienteComponent.getClientesNegocio(req);
      /* if (cliente.rowCount > 0) {
      clientes.errorMsg = 'error.cliente-duplicado';
    } */

      logger(req);
      res.send(clientes);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
