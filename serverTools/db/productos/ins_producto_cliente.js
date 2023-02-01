/**
 * Agrega un producto a un cliente de un negocio en particular
 * 
 * @author Gonzalo Barría
 */

export const insProductoCliente = () => {
  return `
    INSERT INTO productos_cliente (
      id_cliente,
      id_producto,
      precio_venta
    )
    VALUES ($1, $2, $3)
    RETURNING id_producto_cliente
`;
};
