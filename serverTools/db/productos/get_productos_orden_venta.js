/**
 * Obtiene una orden especifica
 *
 * @author Gonzalo Barría
 */

export const getProductosOrdenVenta = () => `
  SELECT
    id_producto,
    id_almacen,
    a.glosa glosa_almacen,
    id_tipo_venta,
    p.glosa,
    precio_venta,
    cantidad,
    pov.datos_adicionales
  FROM productos_orden_venta pov
  INNER JOIN productos p USING(id_producto)
  INNER JOIN almacenes a USING(id_almacen)
  WHERE id_orden_venta = $1
`;
