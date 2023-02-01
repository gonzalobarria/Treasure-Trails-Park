/**
 * Obtiene todos los productos de un almacen
 *
 * @author Gonzalo Barría
 */

export const getProductosAlmacenes = () => `
  SELECT
    pa.id_producto,
    pa.id_almacen,
    p.glosa,
    pa.stock_disponible,
    pa.datos_adicionales,
    p.sku,
    p.precio_detalle,
    p.precio_mayor,
    p.precio_embalaje,
    p.unidades_embalaje,
    p.unidades_venta
  FROM productos_almacen pa
  INNER JOIN productos p USING(id_producto)
  WHERE id_almacen = ANY ($1)
  ORDER BY p.glosa
`;
