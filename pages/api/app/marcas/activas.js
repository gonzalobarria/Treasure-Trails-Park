import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import marcaComponent from 'serverTools/components/marca';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  try {
    const marcas = await marcaComponent.getMarcasActivas();

    logger(req);
    res.send(marcas);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
