import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import categoriaComponent from 'serverTools/components/categoria';
import { errorDB, getID, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    let { idCategoria } = req.query;
    let salida = {};
    idCategoria = getID(idCategoria);

    try {
      const categoria = await categoriaComponent.getCategoria(idCategoria);

      if (categoria.rows.length === 1) salida = categoria.rows[0];

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
      const categoria = await categoriaComponent.updCategoria(req);

      const categorias = await categoriaComponent.getCategorias(req.query);
      /* if (categoria.rowCount > 0) {
      categorias.errorMsg = 'error.categoria-duplicada';
    } */

      logger(req);
      res.send(categorias);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
