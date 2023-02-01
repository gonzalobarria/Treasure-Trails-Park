/**
 * Obtiene un producto en particular
 * 
 * @author Gonzalo Barría
 */

export const getProducto = () => `
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
    activo
  FROM productos p
  WHERE id_producto = $1
`;
