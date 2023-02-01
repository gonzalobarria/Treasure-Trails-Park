import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import usuarioComponent from 'serverTools/components/usuario';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  const { id } = req.user;

  try {
    const { rows } = await usuarioComponent.getRolesUsuario(id);

    logger(req);
    res.send(rows);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
