/**
 * Obtiene todos las órdenes en las que se encuentra un producto
 *
 * @author Gonzalo Barría
 */

import { TIPOS_ALMACEN } from "serverTools/utils/enums";

export const getOrdenesAlmacen = () => {
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
      (
        id_origen IN (
          SELECT id_almacen
          FROM almacenes
          WHERE id_almacen = $4
          AND id_tipo_almacen = ${TIPOS_ALMACEN.BODEGA}
        ) 
        AND o.es_interno = true
      )
      OR (
        id_destino IN (
          SELECT id_almacen
          FROM almacenes
          WHERE id_almacen = $4
        )
      )
    )
    AND o.id_negocio = $3
    ORDER BY fecha_creacion DESC
    LIMIT $1
    OFFSET $2;
  `;
};
