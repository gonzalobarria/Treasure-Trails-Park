/**
 * verifica que el usuario pueda ver el negocio
 *
 * @author Gonzalo Barría
 */

export const isUsuarioNegocio = () => `
  SELECT
    1 
  FROM permisos_usuario
  WHERE id_negocio = $2
  AND id_usuario = $1
  LIMIT 1
`;
