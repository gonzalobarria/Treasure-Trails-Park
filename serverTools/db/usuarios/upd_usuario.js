/**
 * Actualiza un usuario
 *
 * @author Gonzalo Barría
 */

export const updUsuario = () => `
  UPDATE usuarios SET
    nombre = $2,
    ap_paterno = $3,
    ap_materno = $4,
    email = $5,
    id_estado = $6
  WHERE id_usuario = $1
`;
