/**
 * Obtiene todos los usuarios del negocio
 * 
 * @author Gonzalo Barría
 */

export const getUsuarios = (orderBy) => {
  let columna = 'nombre';
  switch (parseInt(orderBy)) {
    case 1:
      columna = 'nombre';
      break;
    case 3:
      columna = 'id_estado, nombre';
    default:
      break;
  }

  return `
    SELECT
      id_usuario,
      nombre,
      ap_paterno,
      ap_materno,
      email,
      datos_adicionales,
      id_estado
    FROM usuarios
    ORDER BY ${columna}
    LIMIT $1
    OFFSET $2;
  `;
};
