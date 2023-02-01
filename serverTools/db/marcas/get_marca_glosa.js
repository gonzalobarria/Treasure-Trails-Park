/**
 * Obtiene una marca por la glosa
 *
 * @author Gonzalo Barría
 */

export const getMarcaXGlosa = () => {
  return `
    SELECT
      id_marca
    FROM marcas
    WHERE LOWER(glosa) = LOWER($1)
  `;
};
