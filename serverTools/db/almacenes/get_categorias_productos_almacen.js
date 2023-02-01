/**
 * Obtiene los almacenes activos por tipo de almacen
 *
 * @author Gonzalo Barría
 */

export const getCategoríasProductosAlmacen = () => `
  SELECT DISTINCT
    c.id_categoria,
    c.glosa,
    c.activo,
    c.id_categoria_padre
  FROM productos_almacen pa
  INNER JOIN almacenes a USING(id_almacen)
  INNER JOIN productos p USING(id_producto)
  INNER JOIN categorias c USING(id_categoria)
  WHERE id_almacen = $1
  AND a.id_negocio = $2
  AND a.id_estado = $3
  ORDER BY glosa
`;
