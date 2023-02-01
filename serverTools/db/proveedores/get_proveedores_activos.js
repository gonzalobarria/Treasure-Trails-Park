/**
 * Obtiene todos los proveedores activas
 * 
 * @author Gonzalo Barría
 */

const { ESTADOS_PROVEEDOR } = require("../../utils/enums");

export const getProveedoresActivos = () => {
  return `
    SELECT
      id_proveedor,
      glosa,
      descripcion,
      datos_adicionales,
      id_region,
      id_comuna,
      id_ciudad,
      id_estado
    FROM proveedores
    WHERE id_estado = ${ESTADOS_PROVEEDOR.ACTIVO}
    ORDER BY glosa
  `;
};
