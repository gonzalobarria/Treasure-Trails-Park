import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import usuarioComponent from 'serverTools/components/usuario';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  let salida = {};

  try {
    const usuarios = await usuarioComponent.getUsuarios();

    if (usuarios.rows.length === 1) salida = usuarios.rows[0];

    logger(req);
    res.send(salida);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
