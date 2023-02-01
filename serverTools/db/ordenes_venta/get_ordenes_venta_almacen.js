/**
 * Obtiene todas las órdenes venta de un almacen
 *
 * @author Gonzalo Barría
 */

export const getOrdenesVentaAlmacen = () => {
  return `
    SELECT
      id_orden_venta,
      a.glosa glosa_almacen,
      fecha_creacion,
      o.id_estado,
      eo.glosa glosa_estado,
      count(*) OVER() AS total 
    FROM ordenes_venta o
    INNER JOIN almacenes a ON id_almacen = a.id_almacen
    INNER JOIN estados_orden eo ON o.id_estado = eo.id_estado
    WHERE id_almacen = $4
    AND a.id_negocio = $3
    ORDER BY fecha_creacion DESC
    LIMIT $1
    OFFSET $2;
  `;
};
