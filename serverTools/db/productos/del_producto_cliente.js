/**
 * Elimina un producto de un cliente
 *
 * @author Gonzalo Barría
 */

export const delProductoCliente = () => {
  return `
    DELETE FROM productos_cliente
    WHERE id_cliente = $1
    AND id_producto = $2
  `;
};
