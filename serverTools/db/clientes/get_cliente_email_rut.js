/**
 * Obtiene un cliente por un email o un rut
 *
 * @author Gonzalo Barría
 */

export const getClienteEmailRut = () => {
  return `
    SELECT
      nombre
    FROM clientes
    WHERE id_negocio = $1
    AND (
      LOWER(email) = LOWER($2)
      OR
      rut = $3
    )
  `;
};
