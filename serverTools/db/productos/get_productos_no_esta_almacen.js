/**
 * Obtiene todos los productos de un proveedor
 *
 * @author Gonzalo Barría
 */

export const getProductosNoEstanAlmacen = () => `
  SELECT
    id_producto,
    glosa
  FROM productos
  WHERE id_negocio = $2
  AND activo = true
  AND id_producto NOT IN (
    SELECT id_producto
    FROM productos_almacen
    INNER JOIN almacenes a USING(id_almacen)
    WHERE id_almacen = $1
    AND a.id_negocio = $2
  )
  ORDER BY glosa
`;
