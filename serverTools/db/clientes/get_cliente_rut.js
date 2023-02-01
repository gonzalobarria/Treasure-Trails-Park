/**
 * Obtiene un cliente por rut
 *
 * @author Gonzalo Barría
 */

export const getClienteRut = () => `
  SELECT
    nombre
  FROM clientes
  WHERE id_negocio = $1
  AND rut = $2
`;
