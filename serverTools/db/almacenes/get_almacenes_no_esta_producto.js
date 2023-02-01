/**
 * Obtiene todos los almacenes en los cuales un producto no se encuentra
 *
 * @author Gonzalo Barría
 */

export const getAlmacenesNoEstaProducto = () => `
  SELECT
    id_almacen,
    glosa  
  FROM almacenes
  WHERE id_almacen NOT IN (
    SELECT id_almacen
    FROM productos_almacen
    INNER JOIN almacenes USING(id_almacen)
    WHERE id_producto = $1
    AND id_negocio = $2
  )
  AND id_negocio = $2
  AND id_estado = $3
  ORDER BY id_tipo_almacen, glosa
`;
