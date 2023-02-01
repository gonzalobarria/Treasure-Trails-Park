/**
 * Lista paginada de productos
 *
 * @author Gonzalo Barría
 */

export const getProductosTodos = () => `
  SELECT
    id_producto,
    id_negocio,
    m.id_marca,
    id_categoria,
    p.glosa,
    m.glosa glosa_marca,
    p.descripcion,
    precio_detalle,
    precio_mayor,
    precio_embalaje,
    unidades_embalaje,
    unidades_venta,
    barcode,
    sku,
    p.datos_adicionales,
    p.activo
  FROM productos p
  LEFT JOIN marcas m USING(id_marca)
  WHERE id_negocio = $1
  AND p.activo = true
  ORDER BY glosa
`;
