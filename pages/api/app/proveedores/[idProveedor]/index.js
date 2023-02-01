import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import proveedorComponent from 'serverTools/components/proveedor';
import { errorDB, getID, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    let { idProveedor } = req.query;
    let salida = {};
    idProveedor = getID(idProveedor);

    try {
      const proveedores = await proveedorComponent.getProveedor(idProveedor);

      if (proveedores.rows.length === 1) salida = proveedores.rows[0];

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
      const proveedor = await proveedorComponent.updProveedor(req);

      const proveedores = await proveedorComponent.getProveedores(req.query);
      /* if (proveedor.rowCount > 0) {
        proveedores.errorMsg = 'error.proveedor-duplicado';
      } */

      logger(req);
      res.send(proveedores);
    } catch (error) {
      const err = errorDB(error);

      logger(req, err);
      res.status(400).send(err);
    }
  });

export default handler;
