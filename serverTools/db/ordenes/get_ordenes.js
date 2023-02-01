/**
 * Obtiene todos las órdenes sin importar si está activo
 *
 * @author Gonzalo Barría
 */

export const getOrdenes = (orderBy) => {
  let columna = 'id_orden DESC';
  switch (parseInt(orderBy)) {
    case 1:
      columna = 'id_orden DESC';
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
      id_orden,
      (SELECT glosa FROM almacenes WHERE id_destino = id_almacen) destino,
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
    INNER JOIN estados_orden eo ON o.id_estado = eo.id_estado
    WHERE o.id_negocio = $3
    ORDER BY ${columna}
    LIMIT $1
    OFFSET $2;
  `;
};
