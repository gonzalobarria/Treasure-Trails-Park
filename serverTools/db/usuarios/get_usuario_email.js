/**
 * Obtiene un cliente por un email o un rut
 *
 * @author Gonzalo Barría
 */

 export const getUsuarioEmail = () => {
  return `
    SELECT
      id_usuario
    FROM usuarios
    WHERE LOWER(email) = LOWER($1)
  `;
};
