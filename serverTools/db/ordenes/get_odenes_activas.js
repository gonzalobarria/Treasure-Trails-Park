/**
 * Obtiene todos las órdenes activas
 * 
 * @author Gonzalo Barría
 */

export const getOrdenesActivos = () => {
  return `
    SELECT
        id_producto,
        glosa,
        descripcion,
        datos_adicionales,
        id_marca
    FROM productos
    WHERE activo = true
  `;
};
