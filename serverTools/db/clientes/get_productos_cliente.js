/**
 * Obtiene todos los productos de un cliente
 * de un negocio
 *
 * @author Gonzalo Barría
 */

export const getProductosCliente = () => `
  SELECT
    pc.id_cliente,
    p.id_producto,
    p.glosa,
    p.descripcion,
    p.datos_adicionales,
    p.activo,
    pc.precio_venta
  FROM productos p
  INNER JOIN productos_cliente pc USING(id_producto)
  INNER JOIN clientes c USING(id_cliente)
  WHERE pc.id_cliente = $1
  AND c.id_negocio = $2
  ORDER BY p.glosa
`;
