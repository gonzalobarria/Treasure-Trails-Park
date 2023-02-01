/**
 * Actualiza la imagen de un producto de una orden
 *
 * @author Gonzalo Barría
 */

export const updPhotoProductoOrden = () => `
  UPDATE productos_orden SET
    datos_adicionales = $3
  WHERE id_orden = $1
  AND id_producto = $2
`;
