import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import usuarioComponent from 'serverTools/components/usuario';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    let salida = {};

    try {
      const usuario = await usuarioComponent.getUsuarioNegocio(req);

      if (usuario.rows.length === 1) salida = usuario.rows[0];

      logger(req);
      res.send(salida);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  })
  .put(async (req, res) => {
    try {
      const { rowCount } = await usuarioComponent.updUsuario(req);

      if (rowCount !== 1) throw new Error('Usuario no pudo ser actualizado');

      logger(req);
      res.send({ msg: 'Realizado con éxito' });
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
