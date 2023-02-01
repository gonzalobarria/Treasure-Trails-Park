/**
 * Obtiene todos los usuarios que se pueden asignar a una orden
 *
 * @author Gonzalo Barría
 */

export const getUsuariosOrden = () => `
  SELECT 
    DISTINCT
    u.id_usuario,
    nombre,
    ap_paterno,
    ap_paterno
  FROM permisos_usuario
  INNER JOIN usuarios u USING(id_usuario)
  WHERE id_negocio = $1
  AND id_estado = $2
  AND id_perfil = ANY ($3)
  ORDER BY nombre
`;
