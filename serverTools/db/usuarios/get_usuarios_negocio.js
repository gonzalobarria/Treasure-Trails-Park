/**
 * Obtiene todos los usuarios del negocio
 *
 * @author Gonzalo Barría
 */

export const getUsuariosNegocio = (orderBy, search) => {
  let columna = 'nombre';
  switch (parseInt(orderBy)) {
    case 3:
      columna = 'u.id_estado, nombre';
    default:
      break;
  }

  return `
    SELECT 
      u.id_usuario,
      nombre,
      ap_paterno,
      ap_materno,
      email,
      u.datos_adicionales,
      u.id_estado,
      count(*) OVER() AS total
    FROM usuarios u
    INNER JOIN (
      SELECT DISTINCT id_usuario 
      FROM permisos_usuario
      INNER JOIN negocios USING(id_negocio)
      WHERE id_negocio = $4
    ) tmp 
    ON u.id_usuario = tmp.id_usuario
    WHERE (tsv_usuario_text @@ plainto_tsquery($3) or ${search === undefined})
    ORDER BY ${columna}
    LIMIT $1
    OFFSET $2;
  `;
};
