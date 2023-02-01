/**
 * Obtiene todas las categorias sin importar si está activo
 *
 * @author Gonzalo Barría
 */

export const getCategoriasTodas = () => {
  return `
    SELECT 
      id_categoria, 
      glosa, 
      id_categoria_padre,
      datos_adicionales,
      activo
    FROM categorias
    ORDER BY glosa
  `;
};
