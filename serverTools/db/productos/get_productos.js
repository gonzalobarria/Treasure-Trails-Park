/**
 * Lista paginada de productos
 *
 * @author Gonzalo Barría
 */

export const getProductos = (orderBy, search) => {
  let columna = 'glosa';
  switch (parseInt(orderBy)) {
    case 3:
      columna = 'activo, glosa';
    default:
      break;
  }

  return `
    SELECT
      id_producto,
      id_negocio,
      id_marca,
      id_categoria,
      glosa,
      descripcion,
      precio_detalle,
      precio_mayor,
      precio_embalaje,
      unidades_embalaje,
      unidades_venta,
      barcode,
      sku,
      datos_adicionales,
      activo,
      count(*) OVER() AS total 
    FROM productos
    WHERE id_negocio = $3
    AND (tsv_producto_text @@ plainto_tsquery($4) or ${search === undefined})
    ORDER BY ${columna}
    LIMIT $1
    OFFSET $2;
  `;
};
