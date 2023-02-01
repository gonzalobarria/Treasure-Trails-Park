/**
 * Obtiene todos los productos de un almacen
 *
 * @author Gonzalo Barría
 */

export const getProductosAlmacen = () => `
  SELECT
    pa.id_producto,
    pa.id_almacen,
    p.glosa,
    pa.stock_disponible,
    pa.datos_adicionales,
    p.sku
  FROM productos_almacen pa
  INNER JOIN productos p USING(id_producto)
  WHERE id_almacen = $1
  ORDER BY p.glosa
`;
