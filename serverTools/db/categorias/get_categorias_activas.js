/**
 * Obtiene todas las categorias activas
 *
 * @author Gonzalo Barría
 */

export const getCategoriasActivas = () => `
  SELECT
    id_categoria,
    glosa,
    id_categoria_padre,
    datos_adicionales
  FROM categorias
  WHERE activo = $1
  ORDER BY glosa
`;
