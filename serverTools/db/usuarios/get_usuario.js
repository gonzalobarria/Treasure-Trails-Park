/**
 * Obtiene un Usuario por su Id
 *
 * @author Gonzalo Barría
 */

export const getUsuario = () => {
  return `
    SELECT 
      id_usuario,
      nombre,
      ap_paterno,
      ap_materno,
      email,
      datos_adicionales,
      id_estado,
      refresh_token
    FROM usuarios
    WHERE id_usuario = $1
  `;
};
