/**
 * Obtiene todos los almacenes en los cuales un producto se encuentra
 *
 * @author Gonzalo Barría
 */

export const getAlmacenesProducto = () => `
  SELECT
    a.id_almacen,
    a.glosa,
    pa.stock_disponible,
    pa.cant_minima
  FROM almacenes a
  INNER JOIN productos_almacen pa USING(id_almacen)
  WHERE a.id_negocio = $1
  AND pa.id_producto = $2
  ORDER BY a.glosa
`;
