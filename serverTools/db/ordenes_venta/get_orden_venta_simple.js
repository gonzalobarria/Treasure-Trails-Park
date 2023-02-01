/**
 * Obtiene una orden venta simple
 *
 * @author Gonzalo Barría
 */

export const getOrdenVentaSimple = () => {
  return `
    SELECT
      id_orden_venta,
      id_estado,
      datos_adicionales
    FROM ordenes_venta
    WHERE id_orden_venta = $1
  `;
};
