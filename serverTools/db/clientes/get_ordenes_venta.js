/**
 * Obtiene todos las órdenes de venta
 *
 * @author Gonzalo Barría
 */

export const getOrdenesVenta = (orderBy) => {
  let columna = 'id_orden_venta DESC';
  switch (parseInt(orderBy)) {
    case 1:
      columna = 'id_orden_venta DESC';
      break;
    case 2:
      columna = 'es_interno';
      break;
    case 3:
      columna = 'id_estado';
    default:
      break;
  }

  return `
    SELECT
      id_orden_venta,
      a.glosa,
      a.id_negocio,
      fecha_creacion,
      o.id_estado,
      eo.glosa glosa_estado,
      id_usuario_cajero,
      id_cliente,
      id_tipo_venta,
      total_venta,
      count(*) OVER() AS total 
    FROM ordenes_venta o
    INNER JOIN almacenes a ON o.id_almacen = a.id_almacen
    INNER JOIN estados_orden_venta eo ON o.id_estado = eo.id_estado
    WHERE a.id_negocio = $3
    AND o.id_cliente = $4
    ORDER BY ${columna}
    LIMIT $1
    OFFSET $2;
  `;
};
