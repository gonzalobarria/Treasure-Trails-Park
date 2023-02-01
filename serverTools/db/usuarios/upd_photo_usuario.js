/**
 * Actualiza la imagen de un usuario
 *
 * @author Gonzalo Barría
 */

export const updPhotoUsuario = () => {
  return `
    UPDATE usuarios SET
      datos_adicionales = $2
    WHERE id_usuario = $1
    RETURNING 
      id_usuario,
      nombre,
      ap_paterno,
      ap_materno,
      email,
      datos_adicionales,
      id_estado
  `;
};
