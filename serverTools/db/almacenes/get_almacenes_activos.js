/**
 * Obtiene los almacenes activos por tipo de almacen
 *
 * @author Gonzalo Barría
 */

export const getAlmacenesActivos = () => `
  SELECT 
    id_almacen,
    id_tipo_almacen,
    glosa,
    descripcion,
    datos_adicionales
  FROM almacenes
  WHERE id_negocio = $1
  AND id_estado = $2
  ORDER BY glosa
`;
