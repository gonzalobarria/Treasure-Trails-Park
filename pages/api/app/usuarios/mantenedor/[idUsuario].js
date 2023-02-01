import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import usuarioComponent from 'serverTools/components/usuario';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  let { idUsuario } = req.query;
  idUsuario = getID(idUsuario);

  try {
    const { rows } = await usuarioComponent.getUsuario(idUsuario);

    logger(req);
    res.send(rows[0]);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
