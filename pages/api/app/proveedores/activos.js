import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import proveedorComponent from 'serverTools/components/proveedor';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  try {
    const proveedores = await proveedorComponent.getProveedoresActivos();

    logger(req);
    res.send(proveedores);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
