/**
 * Obtiene un usuario a través de su email
 *
 * @author Gonzalo Barría
 */

export const getUsuarioByEmail = () => `
  SELECT
    id_usuario,
    nombre,
    ap_paterno,
    ap_materno,
    codigo,
    id_estado,
    password,
    id_tipo_ingreso,
    datos_adicionales,
    refresh_token
  FROM usuarios
  WHERE email = $1
  `;
