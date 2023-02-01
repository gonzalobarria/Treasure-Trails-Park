/**
 * Obtiene todos los clientes del negocio
 *
 * @author Gonzalo Barría
 */

export const getClientesNegocio = (orderBy, search) => {
  let columna = 'nombre';
  switch (parseInt(orderBy)) {
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
      activo,
      count(*) OVER() AS total
    FROM clientes
    WHERE id_negocio = $3
    AND (tsv_cliente_text @@ plainto_tsquery($4) or ${search === undefined})
    ORDER BY ${columna}
    LIMIT $1
    OFFSET $2;
  `;
};
