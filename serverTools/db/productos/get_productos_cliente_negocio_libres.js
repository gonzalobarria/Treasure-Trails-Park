/**
 * Obtiene todos productos de un negocio que un cliente no tiene asignados
 *
 * @author Gonzalo Barría
 */

export const getProductosClienteNegocioLibres = () => `
  SELECT 
    id_producto,
    glosa
  FROM productos
  WHERE id_producto IN (
    SELECT
      DISTINCT id_producto
    FROM productos_almacen pa
    INNER JOIN almacenes USING(id_almacen)
    WHERE id_negocio = $1
    AND id_producto NOT IN (
      SELECT id_producto 
      FROM productos_cliente 
      INNER JOIN clientes USING(id_cliente)
      WHERE id_negocio = $1
      AND id_cliente = $2
    )
  )
  ORDER BY glosa
`;
