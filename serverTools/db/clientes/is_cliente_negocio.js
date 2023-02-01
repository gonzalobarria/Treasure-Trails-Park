/**
 * Obtiene todos los clientes del negocio
 *
 * @author Gonzalo Barría
 */

export const isClienteNegocio = () => {
  return `
    SELECT
      id_cliente 
    FROM clientes
    WHERE id_negocio = $2
    AND id_cliente = $1
    LIMIT 1
  `;
};
