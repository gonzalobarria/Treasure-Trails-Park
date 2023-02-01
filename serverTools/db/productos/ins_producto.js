/**
 * Agrega un producto a la tabla productos
 *
 * @author Gonzalo Barría
 */

export const insProducto = () => `
  INSERT INTO productos (
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
    sku
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  RETURNING id_producto
`;
