/**
 * Activa o desactiva un usuario
 *
 * @author Gonzalo Barría
 */

export const updEstadoUsuario = () => {
  return `
    UPDATE usuarios SET 
      id_estado = $2
    WHERE id_usuario = $1
  `;
};
