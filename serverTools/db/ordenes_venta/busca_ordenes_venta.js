/**
 * Lista todos las órdenes venta según su coincidencia en la tabla
 * 
 * @author Gonzalo Barría
 */

export const buscaOrdenesVenta = () => {
  return `
    SELECT
      id_orden_venta,
      a.glosa glosa_almacen,
      a.id_negocio,
      fecha_creacion,
      o.id_estado,
      eo.glosa glosa_estado,
      id_usuario_cajero,
      id_cliente,
      count(*) OVER() AS total 
    FROM ordenes_venta o
    INNER JOIN almacenes a ON o.id_almacen = a.id_almacen
    INNER JOIN estados_orden_venta eo ON o.id_estado = eo.id_estado
    WHERE a.id_negocio = $2
    ORDER BY o.fecha_creacion DESC LIMIT 15;
  `;
};
