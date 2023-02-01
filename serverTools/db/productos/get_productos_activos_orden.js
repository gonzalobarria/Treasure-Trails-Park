/**
 * Obtiene todos los productos activos
 * 
 * @author Gonzalo Barría
 */

export const getProductosActivosOrden = () => `
  SELECT
    id_producto,
    glosa
  FROM productos
  WHERE id_negocio = $1
  AND activo = true
  ORDER BY glosa
`;

