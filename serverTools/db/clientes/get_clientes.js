/**
 * Obtiene todos los clientes del negocio
 * 
 * @author Gonzalo Barría
 */

export const getClientes = (orderBy) => {
  let columna = 'nombre';
  switch (parseInt(orderBy)) {
    case 1:
      columna = 'nombre';
      break;
    case 3:
      columna = 'activo, nombre';
    default:
      break;
  }

  return `
    SELECT
      id_cliente,
      rut,
      dv,
      razon_social,
      nombre,
      ap_paterno,
      ap_materno,
      email,
      datos_adicionales,
      activo
    FROM clientes
    ORDER BY ${columna}
    LIMIT $1
    OFFSET $2;
  `;
};
