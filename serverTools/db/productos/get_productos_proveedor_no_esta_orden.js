/**
 * Obtiene todos los productos que no están en una orden
 *
 * @author Gonzalo Barría
 */

export const getProductosProveedorNoEstanOrden = () => `
  SELECT
    id_producto,
    glosa
  FROM productos p
  WHERE p.activo = true
  AND id_producto NOT IN (
    SELECT id_producto FROM productos_orden
    WHERE id_orden = $1
  )
  ORDER BY glosa
`;
