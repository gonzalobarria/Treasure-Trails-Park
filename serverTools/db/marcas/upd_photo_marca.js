/**
 * Actualiza la imagen de un cliente
 *
 * @author Gonzalo Barría
 */

export const updPhotoMarca = () => {
  return `
    UPDATE marcas SET
      datos_adicionales = $2
    WHERE id_marca = $1
    RETURNING 
      id_marca,
      glosa,
      descripcion,
      datos_adicionales,
      activo
  `;
};
