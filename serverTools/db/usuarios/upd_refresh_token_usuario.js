/**
 * Actualiza el Refresh Token del usuario
 *
 * @author Gonzalo Barría
 */

export const updRefreshTokenUsuario = () => {
  return `
    UPDATE usuarios SET
      refresh_token = $2
    WHERE id_usuario = $1
  `;
};
