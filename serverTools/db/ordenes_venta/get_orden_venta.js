/**
 * Obtiene una orden especifica
 *
 * @author Gonzalo Barría
 */

export const getOrdenVenta = () => `
  SELECT
    id_orden_venta,
    a.glosa glosa_almacen,
    a.id_negocio,
    fecha_creacion,
    tp.id_tipo_pago,
    tp.glosa glosa_tipo_pago,
    o.id_estado,
    eo.glosa glosa_estado,
    o.datos_adicionales,
    o.total_venta
  FROM ordenes_venta o
  INNER JOIN almacenes a USING(id_almacen)
  INNER JOIN estados_orden_venta eo ON o.id_estado = eo.id_estado
  INNER JOIN tipos_pago tp USING(id_tipo_pago)
  WHERE id_orden_venta = $1
  and a.id_negocio = $2
`;
