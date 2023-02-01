import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import negocioComponent from 'serverTools/components/negocio';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    let salida = {};

    try {
      const negocios = await negocioComponent.getNegocios();

      if (negocios.rows.length > 0) salida = negocios.rows;

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
      await negocioComponent.insNegocio(req.body);

      utiles.logger(req);
      res.json({ message: 'Negocio Agregado' });
    } catch (error) {
      const err = utiles.errorDB(error);

      utiles.logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
