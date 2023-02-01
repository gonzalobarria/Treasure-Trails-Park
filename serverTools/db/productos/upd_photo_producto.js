/**
 * Actualiza la imagen de un producto
 *
 * @author Gonzalo Barría
 */

export const updPhotoProducto = () => `
  UPDATE productos SET
    datos_adicionales = $2
  WHERE id_producto = $1
  RETURNING
    id_producto,
    glosa,
    descripcion,
    datos_adicionales,
    activo,
    id_marca
`;
