import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import proveedorComponent from 'serverTools/components/proveedor';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    try {
      const proveedores = await proveedorComponent.getProveedores(req);

      logger(req);
      res.send(proveedores);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  })
  .post(async (req, res) => {
    try {
      const proveedor = await proveedorComponent.checkProveedor(req);
      if (proveedor.rowCount === 0) {
        await proveedorComponent.insProveedor(req.body);
      }

      const proveedores = await proveedorComponent.getProveedores(req.query);
      if (proveedor.rowCount > 0) {
        proveedores.errorMsg = 'error.proveedor-duplicado';
      }

      logger(req);
      res.send(proveedores);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
