import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import marcaComponent from 'serverTools/components/marca';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).patch(async (req, res) => {
  let { idMarca } = req.query;
  idMarca = getID(idMarca);

  try {
    const { rowCount } = await marcaComponent.updEstadoMarca(idMarca, req.body);

    let mensaje;
    switch (rowCount) {
      case 1:
        mensaje = { message: 'Marca Actualizada' };
        break;
      default:
        mensaje = { message: 'Warning: Marca NO actualizada' };
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
