/**
 * Verifica la existencia del producto en el almacen
 *
 * @author Gonzalo Barría
 */

export const getProductoAlmacen = () => `
  SELECT
    id_tipo_almacen,
    pa.stock_disponible,
    pa.datos_adicionales
  FROM productos_almacen pa
  INNER JOIN almacenes USING(id_almacen)
  WHERE pa.id_almacen = $1
  AND id_producto = $2
`;
