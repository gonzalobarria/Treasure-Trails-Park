import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import categoriaComponent from 'serverTools/components/categoria';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).patch(async (req, res) => {
  let { idCategoria } = req.query;
  idCategoria = getID(idCategoria);

  try {
    const { rowCount } = await categoriaComponent.updEstadoCategoria(
      idCategoria,
      req.body
    );

    let mensaje;
    switch (rowCount) {
      case 1:
        mensaje = { message: 'Categoria Actualizada' };
        break;
      default:
        mensaje = { message: 'Warning: Categoria NO actualizada' };
        break;
    }

    logger(req);
    res.json(mensaje);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
