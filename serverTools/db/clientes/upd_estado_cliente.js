/**
 * Activa o desactiva un cliente
 *
 * @author Gonzalo Barría
 */

export const updEstadoCliente = () => {
  return `
    UPDATE clientes SET 
      activo = $2
    WHERE id_cliente = $1
  `;
};
