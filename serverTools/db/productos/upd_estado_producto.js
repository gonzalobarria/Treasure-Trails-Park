/**
 * Activa o desactiva un producto
 *
 * @author Gonzalo Barría
 */

export const updEstadoProducto = () => {
  return `
    UPDATE productos SET 
      activo = $2
    WHERE id_producto = $1
  `;
};
