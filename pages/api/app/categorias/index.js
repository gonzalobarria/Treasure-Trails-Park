import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import categoriaComponent from 'serverTools/components/categoria';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    try {
      const categorias = await categoriaComponent.getCategorias(req);

      logger(req);
      res.send(categorias);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  })
  .post(async (req, res) => {
    try {
      const categoria = await categoriaComponent.checkCategoria(req);
      if (categoria.rowCount === 0) {
        await categoriaComponent.insCategoria(req.body);
      }

      const categorias = await categoriaComponent.getCategorias(req.query);
      if (categoria.rowCount > 0) {
        categorias.errorMsg = 'error.categoria-duplicada';
      }

      logger(req);
      res.send(categorias);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
