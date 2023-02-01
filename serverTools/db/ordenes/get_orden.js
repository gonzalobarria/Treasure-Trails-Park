/**
 * Obtiene una orden especifica
 *
 * @author Gonzalo Barría
 */

export const getOrden = () => `
  SELECT
    id_orden,
    a.glosa destino,
    o.id_negocio,
    fecha_creacion,
    o.id_estado,
    eo.glosa glosa_estado,
    o.datos_adicionales,
    (SELECT glosa FROM proveedores WHERE id_origen = id_proveedor AND o.es_interno = false) AS "glosa_proveedor_origen",
    (SELECT glosa FROM almacenes WHERE id_origen = id_almacen AND o.es_interno = true) AS "glosa_bodega_origen",
    es_interno,
    id_origen,
    id_destino,
    a.datos_adicionales datos_adicionales_almacen 
  FROM ordenes o
  INNER JOIN almacenes a ON id_destino = a.id_almacen
  INNER JOIN estados_orden eo ON o.id_estado = eo.id_estado
  WHERE id_orden = $1
  and o.id_negocio = $2
`;
