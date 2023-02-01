/**
 * Obtiene todas las categorias sin importar si está activo
 * paginadas
 * 
 * @author Gonzalo Barría
 */

export const getCategoriasPag = () => {
  return `
    SELECT 
      id_categoria, 
      glosa, 
      id_categoria_padre,
      datos_adicionales,
      activo 
    FROM categorias
    WHERE id_categoria > $1
    ORDER BY id_categoria ASC
    LIMIT $2
  `;
};
