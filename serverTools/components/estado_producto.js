import db from '../db';
import estadosProductoDB from '../db/queries/estados_producto';
import utiles from '../utils/utiles';

export const getEstadoProducto = async (idEstado) => {
  try {
    const { rows } = await db.query(estadosProductoDB.getEstadoProducto(), [
      idEstado,
    ]);
    rows.forEach((estadoProducto) => {
      estadoProducto.idEstado = utiles.encodeId(estadoProducto.idEstado);
    });

    return { rows };
  } catch (error) {
    throw error;
  }
};

export const getEstadosProductos = async () => {
  try {
    const { rows } = await db.query(estadosProductoDB.getEstadosProducto(), []);
    rows.forEach((estadoProducto) => {
      estadoProducto.idEstado = utiles.encodeId(estadoProducto.idEstado);
    });

    return { rows };
  } catch (error) {
    throw error;
  }
};

const estadosProductoComponent = {
  getEstadoProducto,
  getEstadosProductos,
};

export default estadosProductoComponent;
