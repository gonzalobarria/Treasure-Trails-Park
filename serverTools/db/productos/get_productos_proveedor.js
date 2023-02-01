/**
 * Obtiene todos los productos de un proveedor
 *
 * @author Gonzalo Barría
 */

export const getProductosProveedor = () => `
  SELECT 
    id_producto,
    glosa, 
    descripcion,
    datos_adicionales,
    activo,
    id_marca,
    sku 
  FROM productos
  WHERE id_negocio = $1
  AND activo = true
  ORDER BY glosa
`;
