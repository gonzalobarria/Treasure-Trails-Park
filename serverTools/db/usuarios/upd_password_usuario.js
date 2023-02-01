/**
 * Actualiza el password de un usuario
 *
 * @author Gonzalo Barría
 */

export const updPasswordUsuario = () => {
  return `
    UPDATE usuarios SET
      password = $2,
      codigo = null
    WHERE email = $1
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
