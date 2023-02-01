/**
 * Actualiza un producto en particular
 * 
 * @author Gonzalo Barría
 */

export const updProducto = () => `
  UPDATE productos SET 
    id_marca = $2,
    id_categoria = $3,
    glosa = $4,
    descripcion = $5,
    precio_detalle = $6,
    precio_mayor = $7,
    precio_embalaje = $8,
    unidades_embalaje = $9,
    unidades_venta = $10,
    barcode = $11,
    sku = $12,
    activo = $13
  WHERE id_producto = $1
`;
