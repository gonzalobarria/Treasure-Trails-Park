/**
 * Obtiene todas las funcionalidades activas del usuario para negocios activos
 *
 * @author Gonzalo Barría
 */

export const getFuncionalidesUsuario = () => `
  SELECT 
    fu.id_funcionalidad,
    n.id_negocio,
    n.id_division,
    n.glosa,
    n.glosa_division,
    pu.id_almacen
  FROM permisos_usuario pu
  INNER JOIN funcionalidades_perfil fu USING(id_perfil)
  INNER JOIN negocios n USING(id_negocio)
  WHERE pu.id_usuario = $1
  AND fu.activo = true
  AND n.id_estado = 1
  ORDER BY id_negocio, id_division
  `;
