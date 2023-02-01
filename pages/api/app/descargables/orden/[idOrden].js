import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import descargableComponent from 'serverTools/components/descargable';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  try {
    const pdf = await descargableComponent.getOrdenPDF(req);

    logger(req);
    res.send(pdf);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;

export const config = {
  api: {
    responseLimit: '8mb',
  },
};
