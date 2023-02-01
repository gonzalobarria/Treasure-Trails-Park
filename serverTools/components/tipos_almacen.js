import db from '../db';
import tiposAlmacen from 'serverTools/db/tipos_almacen';
import almacenes from 'serverTools/db/almacenes';
import { ESTADOS_ALMACEN } from 'serverTools/utils/enums';
import { encodeId } from 'serverTools/utils/utiles';

const getAlmacenesActivos = async (req) => {
  const {
    query: { idTipoAlmacen },
    user,
  } = req;

  try {
    const { rows } = await db.query(almacenes.getAlmacenesEstado(), [
      user.idNegocioActivo,
      ESTADOS_ALMACEN.HABILITADO,
    ]);

    return rows
      .filter((item) => item.id_tipo_almacen === parseInt(idTipoAlmacen))
      .map((item) => {
        const tmp = { id: encodeId(item.id_almacen), ...item };
        const { id_almacen, ...salida } = tmp;
        return salida;
      });
  } catch (error) {
    throw error;
  }
};

const getTiposAlmacen = async () => {
  try {
    const { rows } = await db.query(tiposAlmacen.getTiposAlmacen(), []);

    return rows.map((item) => {
      const tmp = { id: item.id_tipo_almacen, ...item };
      const { id_tipo_almacen, ...salida } = tmp;
      return salida;
    });
  } catch (error) {
    throw error;
  }
};

const tipoAlmacenComponent = {
  getAlmacenesActivos,
  getTiposAlmacen,
};

export default tipoAlmacenComponent;
