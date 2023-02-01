/**
 * Actualiza el precio de un producto de un cliente
 * 
 * @author Gonzalo Barría
 */

export const updProductoCliente = () => {
  return `
    UPDATE productos_cliente SET 
      precio_venta = $3
    WHERE id_cliente = $1
    AND id_producto = $2
`;
};
