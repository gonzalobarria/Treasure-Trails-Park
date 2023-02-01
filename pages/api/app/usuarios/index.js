import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import usuarioComponent from 'serverTools/components/usuario';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    try {
      const usuario = await usuarioComponent.getUsuariosNegocio(req);

      logger(req);
      res.send(usuario);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  })
  .post(async (req, res) => {
    try {
      const { rowCount } = await usuarioComponent.checkUsuario(req);

      if (rowCount > 0) throw new Error('error.usuario-duplicado');

      await usuarioComponent.insUsuario(req);

      logger(req);
      res.send({ msg: 'Realizado con éxito' });
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
