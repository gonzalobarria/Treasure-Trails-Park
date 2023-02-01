/**
 * Obtiene todas las marcas sin importar si está activo
 *
 * @author Gonzalo Barría
 */

export const getMarcas = (orderBy, search) => {
  let columna = 'glosa';
  switch (parseInt(orderBy)) {
    case 3:
      columna = 'activo, glosa';
    default:
      break;
  }

  return `
    SELECT 
      id_marca, 
      glosa, 
      descripcion,
      datos_adicionales,
      activo,
      count(*) OVER() AS total
    FROM marcas
    WHERE (tsv_marca_text @@ plainto_tsquery($3) or ${search === undefined})
    ORDER BY ${columna}
    LIMIT $1
    OFFSET $2;
  `;
};
