/**
 * Lista todos las órdenes según su coincidencia en la tabla
 * 
 * @author Gonzalo Barría
 */

import { TIPOS_ALMACEN } from "serverTools/utils/enums";

export const buscaOrdenes = () => {
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
      id_usuario_emisor,
      id_usuario_receptor,
      count(*) OVER() AS total 
    FROM ordenes o
    INNER JOIN almacenes a ON id_destino = a.id_almacen
    INNER JOIN estados_orden eo ON o.id_estado = eo.id_estado
    WHERE (
      (
        id_origen IN (
          SELECT id_almacen
          FROM almacenes, plainto_tsquery($1) AS q 
          WHERE (tsv_almacen_text @@ q)
          AND id_tipo_almacen = ${TIPOS_ALMACEN.BODEGA}
        ) 
        AND o.es_interno = true
      )
      OR (
        id_origen IN (
          SELECT id_proveedor 
          FROM proveedores, plainto_tsquery($1) AS q 
          WHERE (tsv_proveedor_text @@ q)
        ) 
        AND o.es_interno = false
      )
      OR (
        id_destino IN (
          SELECT id_almacen
          FROM almacenes, plainto_tsquery($1) AS q 
          WHERE (tsv_almacen_text @@ q)
        )
      )
    )
    AND o.id_negocio = $2
    ORDER BY o.fecha_creacion DESC LIMIT 15;
  `;
};
