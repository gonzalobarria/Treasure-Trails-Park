import noAuth from 'middleware/no-auth';
import nextConnect from 'next-connect';
import almacenComponent from 'serverTools/components/almacen';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(noAuth).post(async (req, res) => {
  try {
    await almacenComponent.updTunnel(req);

    logger(req);
    res.send({ message: 'Realizado con éxito' });
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
