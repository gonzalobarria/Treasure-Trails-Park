/**
 * Obtiene todos los almacenes de un negocio sin importar si está activo
 *
 * @author Gonzalo Barría
 */

const map = { default: 'a.glosa', 3: 'id_estado, a.glosa' };
const getOrder = (opt) => map[opt] ?? map.default;

export const getAlmacenes = (orderBy, search) => `
  SELECT 
    id_almacen,
    id_negocio,
    id_tipo_almacen,
    a.glosa,
    descripcion,
    id_estado,
    ea.glosa glosa_estado,
    datos_adicionales,
    count(*) OVER() AS total
  FROM almacenes a
  INNER JOIN estados_almacen ea USING(id_estado)
  WHERE id_tipo_almacen = $3
  AND id_negocio = $4
  AND (tsv_almacen_text @@ plainto_tsquery($5) or ${search === undefined})
  ORDER BY ${getOrder(orderBy)}
  LIMIT $1
  OFFSET $2;
`;
