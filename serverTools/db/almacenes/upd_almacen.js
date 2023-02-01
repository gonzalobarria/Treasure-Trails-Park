/**
 * Actualiza un almacen en particular
 *
 * @author Gonzalo Barría
 */

export const updAlmacen = () => `
  UPDATE almacenes SET 
    glosa = $3,
    descripcion = $4,
    id_estado = $5,
    datos_adicionales = $6
  WHERE id_almacen = $1
  AND id_negocio = $2
`;
