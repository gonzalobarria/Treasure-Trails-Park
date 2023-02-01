/**
 * Obtiene todos las órdenes en las que se encuentra una marca
 *
 * @author Gonzalo Barría
 */

export const getOrdenesMarca = () => {
  return `
    SELECT
      id_orden,
      a.glosa destino,
      o.id_negocio,
      fecha_creacion,
      o.id_estado,
      eo.glosa glosa_estado,
      (SELECT glosa FROM proveedores WHERE id_origen = id_proveedor AND o.es_interno = false) AS "glosa_proveedor_origen",
      (SELECT glosa FROM almacenes WHERE id_origen = id_almacen AND o.es_interno = true) AS "glosa_bodega_origen",
      es_interno,
      count(*) OVER() AS total 
    FROM ordenes o
    INNER JOIN productos_orden po USING(id_orden)
    INNER JOIN productos USING (id_producto)
    INNER JOIN marcas m USING (id_marca)
    INNER JOIN almacenes a ON id_destino = a.id_almacen
    INNER JOIN estados_orden eo ON o.id_estado = eo.id_estado
    WHERE o.id_negocio = $3
    AND m.id_marca = $4
    ORDER BY fecha_creacion DESC
    LIMIT $1
    OFFSET $2;
  `;
};
