import db from '../db';
import unidadesMedida from 'serverTools/db/unidades-medida';

const getUnidadesMedida = async (body) => {
  try {
    const { rows } = await db.query(unidadesMedida.getUnidadesMedida(), []);

    return rows.map((item) => {
      const res = { id: item.id_unidad_medida, ...item };
      const { id_unidad_medida, ...salida } = res;
      return salida;
    });
  } catch (error) {
    throw error;
  }
};

const unidadMedidaComponent = {
  getUnidadesMedida,
};

export default unidadMedidaComponent;
