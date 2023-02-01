/**
 * Elimina un producto de un almacen
 *
 * @author Gonzalo Barría
 */

export const delProductoAlmacen = () => `
  DELETE FROM productos_almacen pa
  WHERE id_almacen = $1
  AND id_producto = $2
  AND EXISTS (
    SELECT 1 
    FROM almacenes a 
    WHERE a.id_almacen = pa.id_almacen 
    AND id_negocio = $3
    AND a.id_almacen = $1
  )
`;
