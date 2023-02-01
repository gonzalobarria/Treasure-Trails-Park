/**
 * Obtiene un almacen del negocio por la glosa
 *
 * @author Gonzalo Barría
 */

export const getAlmacenXGlosa = () => `
  SELECT
    id_almacen
  FROM almacenes
  WHERE LOWER(glosa) = LOWER($1)
  AND id_negocio = $2
`;
