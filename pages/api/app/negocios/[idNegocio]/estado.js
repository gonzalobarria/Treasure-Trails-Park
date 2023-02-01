import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import negocioComponent from 'serverTools/components/negocio';
import { errorDB, getID, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).patch(async (req, res) => {
  let { idNegocio } = req.query;
  idNegocio = getID(idNegocio);

  try {
    const { rowCount } = await negocioComponent.updEstadoNegocio(
      idNegocio,
      req.body
    );

    let mensaje;
    switch (rowCount) {
      case 1:
        mensaje = { message: 'Negocio Actualizado' };
        break;
      default:
        mensaje = { message: 'Warning: Negocio NO actualizado' };
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
