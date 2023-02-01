/**
 * Obtiene todas las categorias sin importar si está activo
 *
 * @author Gonzalo Barría
 */

export const getCategorias = (orderBy, search) => {
  let columna = 'glosa';
  switch (parseInt(orderBy)) {
    case 3:
      columna = 'activo, glosa';
    default:
      break;
  }

  return `
    SELECT 
      id_categoria, 
      glosa, 
      id_categoria_padre,
      datos_adicionales,
      activo,
      count(*) OVER() AS total
    FROM categorias
    WHERE (tsv_categoria_text @@ plainto_tsquery($3) or ${search === undefined})
    ORDER BY ${columna}
    LIMIT $1
    OFFSET $2;
  `;
};
