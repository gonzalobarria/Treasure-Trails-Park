/**
 * Obtiene todos los productos de un almacen
 *
 * @author Gonzalo Barría
 */

export const getProductosAlmacenVenta = (orderBy, categoria, search) => {
  let columna = 'p.glosa';
  switch (parseInt(orderBy)) {
    case 3:
      columna = 'activo, p.glosa';
      break;
    default:
      break;
  }

  return `
    SELECT
      p.id_producto,
      p.glosa,
      p.descripcion,
      p.sku,
      p.precio_detalle,
      p.precio_mayor,
      p.precio_embalaje,
      p.unidades_embalaje,
      p.unidades_venta,
      p.datos_adicionales,
      pa.stock_disponible,
      count(*) OVER() AS total 
    FROM productos_almacen pa
    INNER JOIN productos p USING(id_producto)
    WHERE id_almacen = $3
    AND (tsv_producto_text @@ plainto_tsquery($5) or ${search === undefined})
    AND (
      ${categoria === -1} OR
      (
        id_categoria = $4
        OR id_categoria IN (
          SELECT id_categoria FROM categorias 
          WHERE id_categoria_padre = $4
        )
      )
    )
    ORDER BY ${columna}
    LIMIT $1
    OFFSET $2;
  `;
};
