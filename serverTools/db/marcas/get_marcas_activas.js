/**
 * Obtiene todas las marcas activas
 *
 * @author Gonzalo Barría
 */

export const getMarcasActivas = () => `
  SELECT
    id_marca,
    glosa,
    descripcion,
    datos_adicionales
  FROM marcas
  WHERE activo = $1
  ORDER BY glosa
`;
