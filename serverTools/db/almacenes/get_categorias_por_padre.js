/**
 * Obtiene los almacenes activos por tipo de almacen
 *
 * @author Gonzalo Barría
 */

export const getCategoríasPorPadre = () => `
  SELECT
    id_categoria,
    glosa,
    activo,
    id_categoria_padre
  FROM categorias
  WHERE id_categoria = ANY ($1)
  ORDER BY glosa
`;
