/**
 * Elimina un producto de una orden
 *
 * @author Gonzalo Barría
 */

export const delProductoOrden = () => `
  DELETE FROM productos_orden 
  WHERE id_orden = $1
  AND id_producto = $2
`;
