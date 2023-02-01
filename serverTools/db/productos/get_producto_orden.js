/**
 * Obtiene un producto de una orden
 *
 * @author Gonzalo Barría
 */

export const getProductoOrden = () => `
  SELECT
    id_producto,
    id_unidad_medida,
    cantidad,
    datos_adicionales
  FROM productos_orden
  WHERE id_orden = $1
  and id_producto = $2
`;
