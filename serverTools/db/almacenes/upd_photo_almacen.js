/**
 * Actualiza la imagen de un cliente
 *
 * @author Gonzalo Barría
 */

export const updPhotoAlmacen = () => {
  return `
    UPDATE almacenes SET
      datos_adicionales = $2
    WHERE id_almacen = $1
    RETURNING 
      id_almacen,
      id_negocio,
      id_tipo_almacen,
      glosa,
      descripcion,
      datos_adicionales
  `;
};
