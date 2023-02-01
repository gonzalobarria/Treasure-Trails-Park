/**
 * Obtiene una categoria por la glosa
 *
 * @author Gonzalo Barría
 */

export const getCategoriaXGlosa = () => {
  return `
    SELECT
      id_categoria
    FROM categorias
    WHERE LOWER(glosa) = LOWER($1)
  `;
};
