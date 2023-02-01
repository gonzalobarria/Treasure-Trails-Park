/**
 * Obtiene todos los productos de un almacen
 * que no están en una orden
 *
 * @author Gonzalo Barría
 */

export const getProductosAlmacenNoEstanOrden = () => `
  SELECT
    p.id_producto,
    p.glosa,
    pa.stock_disponible
  FROM productos_almacen pa
  INNER JOIN productos p USING(id_producto)
  WHERE id_almacen = $2
  AND p.id_producto NOT IN (
    SELECT id_producto FROM productos_orden
    WHERE id_orden = $1
  )
  ORDER BY p.glosa
`;
