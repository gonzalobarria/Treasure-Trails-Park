/**
 * Obtiene una orden especifica
 *
 * @author Gonzalo Barría
 */

export const getProductosVoucher = () => `
  SELECT
    p.id_producto,
    ov.id_almacen,
    precio_venta,
    cantidad,
    pov.id_tipo_venta,
    p.id_producto,
    p.glosa,
    p.descripcion,
    p.sku,
    p.precio_detalle,
    (SELECT precio_venta FROM productos_cliente WHERE id_cliente = ov.id_cliente AND id_producto = p.id_producto) precio_cliente,
    p.precio_mayor,
    p.precio_embalaje,
    p.unidades_embalaje,
    p.unidades_venta,
    p.datos_adicionales,
    pa.stock_disponible
  FROM ordenes_venta ov
  INNER JOIN productos_orden_venta pov USING(id_orden_venta)
  INNER JOIN productos p USING(id_producto)
  LEFT JOIN productos_almacen pa ON (pov.id_almacen = pa.id_almacen AND pov.id_producto = pa.id_producto)
  WHERE id_orden_venta = $1
`;
