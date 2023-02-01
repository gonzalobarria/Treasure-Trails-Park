import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import clienteComponent from 'serverTools/components/cliente';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).patch(async (req, res) => {
  try {
    await clienteComponent.updEstadoCliente(req);

    const clientes = await clienteComponent.getClientesNegocio(req);

    logger(req);
    res.send(clientes);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
