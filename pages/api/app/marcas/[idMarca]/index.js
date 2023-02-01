import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import marcaComponent from 'serverTools/components/marca';
import { errorDB, getID, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    let { idMarca } = req.query;
    let salida = {};
    idMarca = getID(idMarca);

    try {
      const marca = await marcaComponent.getMarca(idMarca);

      if (marca.rows.length === 1) salida = marca.rows[0];

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
      const marca = await marcaComponent.updMarca(req);

      const marcas = await marcaComponent.getMarcas(req.query);
      /* if (marca.rowCount > 0) {
        marcas.errorMsg = 'error.marca-duplicada';
      } */

      logger(req);
      res.send(marcas);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
