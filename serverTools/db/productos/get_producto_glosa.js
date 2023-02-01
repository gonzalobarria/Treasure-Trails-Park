/**
 * Obtiene un producto por la glosa
 *
 * @author Gonzalo Barría
 */

export const getProductoXGlosa = () => `
  SELECT
    id_producto
  FROM productos
  WHERE LOWER(glosa) = LOWER($1)
`;
