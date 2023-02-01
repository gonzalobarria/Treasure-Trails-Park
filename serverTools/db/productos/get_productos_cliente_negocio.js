/**
 * Obtiene todos los clientes del negocio
 *
 * @author Gonzalo Barría
 */

export const getProductosClienteNegocio = () => {
  return `
    SELECT
      pc.id_producto_cliente,
      p.id_producto,
      p.glosa,
      p.descripcion,
      p.datos_adicionales,
      p.activo,
      pc.precio_venta
    FROM productos p
    INNER JOIN productos_cliente pc USING(id_producto)
    INNER JOIN clientes c USING(id_cliente)
    WHERE pc.id_cliente = $2
    AND c.id_negocio = $1
    ORDER BY p.glosa
  `;
};
