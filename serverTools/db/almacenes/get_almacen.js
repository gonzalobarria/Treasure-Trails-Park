/**
 * Obtiene un almacen en particular sin importar si está activo
 *
 * @author Gonzalo Barría
 */

export const getAlmacen = () => `
  SELECT
    id_almacen,
    glosa,
    descripcion,
    datos_adicionales,
    id_estado
  FROM almacenes
  WHERE id_almacen = $1
`;
