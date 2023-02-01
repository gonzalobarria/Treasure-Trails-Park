import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import usuarioComponent from 'serverTools/components/usuario';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).patch(async (req, res) => {
  try {
    await usuarioComponent.updEstadoUsuario(req);

    const usuarios = await usuarioComponent.getUsuariosNegocio(req);

    logger(req);
    res.send(usuarios);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
