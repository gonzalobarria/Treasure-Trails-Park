/**
 * Obtiene todos las órdenes en las que se encuentra un producto
 *
 * @author Gonzalo Barría
 */

export const getOrdenesProveedor = () => {
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
    INNER JOIN almacenes a ON id_destino = a.id_almacen
    INNER JOIN estados_orden eo ON o.id_estado = eo.id_estado
    WHERE (
      id_origen IN (
        SELECT id_proveedor 
        FROM proveedores
        WHERE id_proveedor = $4
      ) 
      AND o.es_interno = false
    )
    AND o.id_negocio = $3
    ORDER BY fecha_creacion DESC
    LIMIT $1
    OFFSET $2;
  `;
};
