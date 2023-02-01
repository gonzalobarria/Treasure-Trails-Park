/**
 * Obtiene todos las órdenes en las que se encuentra una marca
 *
 * @author Gonzalo Barría
 */

export const getOrdenesVentaMarca = () => {
  return `
    SELECT
      id_orden_venta,
      a.glosa glosa_almacen,
      a.id_negocio,
      fecha_creacion,
      o.id_estado,
      eo.glosa glosa_estado,
      count(*) OVER() AS total 
    FROM ordenes_venta o
    INNER JOIN marcas m USING (id_marca)
    INNER JOIN almacenes a ON id_almacen = a.id_almacen
    INNER JOIN estados_orden eo ON o.id_estado = eo.id_estado
    WHERE a.id_negocio = $3
    AND m.id_marca = $4
    ORDER BY fecha_creacion DESC
    LIMIT $1
    OFFSET $2;
  `;
};
