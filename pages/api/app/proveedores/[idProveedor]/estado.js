import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import proveedorComponent from 'serverTools/components/proveedor';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).patch(async (req, res) => {
  let { idProveedor } = req.query;
  idProveedor = getID(idProveedor);

  try {
    const { rowCount } = await proveedorComponent.updEstadoProveedor(
      idProveedor,
      req.body
    );

    let mensaje;
    switch (rowCount) {
      case 1:
        mensaje = { message: 'Proveedor Actualizado' };
        break;
      default:
        mensaje = { message: 'Warning: Proveedor NO actualizado' };
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
