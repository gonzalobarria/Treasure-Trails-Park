/**
 * Obtiene todos los productos de un almacen
 * más los del cliente
 *
 * @author Gonzalo Barría
 */

export const getProductosAlmacenVentaCliente = (orderBy, categoria, search) => {
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
      a.pv precio_detalle,
      p.precio_mayor,
      p.precio_embalaje,
      p.unidades_embalaje,
      p.unidades_venta,
      p.datos_adicionales,
      a.stock_disponible,
      a.fake_stock,
      count(*) OVER() AS total 
    FROM (
      SELECT id_producto, stock_disponible, precio_detalle pv, false fake_stock
      FROM productos_almacen p
      INNER JOIN productos USING(id_producto)
      WHERE NOT EXISTS(SELECT 1 FROM productos_cliente WHERE p.id_producto = id_producto AND id_cliente = $6)
      AND id_almacen = $3
      UNION	
      SELECT id_producto, 1000 stock_disponible, precio_venta pv, true fake_stock
      FROM productos_cliente p
      WHERE NOT EXISTS(SELECT 1 FROM productos_almacen WHERE p.id_producto = id_producto AND id_almacen = $3)
      AND id_cliente = $6
      UNION
      SELECT id_producto, stock_disponible, precio_venta pv, false fake_stock
      FROM productos_almacen
      INNER JOIN productos_cliente USING(id_producto)
      WHERE id_almacen = $3
      AND id_cliente = $6
    ) a
    INNER JOIN productos p USING(id_producto)
    WHERE (tsv_producto_text @@ plainto_tsquery($5) or ${search === undefined})
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
