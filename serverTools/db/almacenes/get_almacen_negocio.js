/**
 * Verifica que el almacen pertenece al negocio
 *
 * @author Gonzalo Barría
 */

export const getAlmacenNegocio = () => `
  SELECT
    id_almacen,
    id_negocio,
    id_tipo_almacen,
    glosa,
    descripcion,
    datos_adicionales
  FROM almacenes
  WHERE id_almacen = $1
  AND id_negocio = $2
`;
