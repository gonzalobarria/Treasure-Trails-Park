/**
 * Obtiene los productos de una orden
 *
 * @author Gonzalo Barría
 */

export const getProductosOrden = () => `
  SELECT
    p.id_producto,
    p.glosa,
    cantidad,
    um.id_unidad_medida,
    um.glosa glosa_unidad_medida,
    po.datos_adicionales,
    p.precio_detalle,
    p.precio_mayor,
    p.precio_embalaje,
    p.unidades_embalaje,
    p.unidades_venta
  FROM productos_orden po
  INNER JOIN productos p USING(id_producto)
  INNER JOIN unidades_medida um USING(id_unidad_medida)
  WHERE id_orden = $1
  ORDER BY p.glosa
`;
