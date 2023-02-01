/**
 * Actualiza la imagen de una orden
 *
 * @author Gonzalo Barría
 */

export const updPhotoOrden = () => {
  return `
    UPDATE ordenes SET
      datos_adicionales = $2
    WHERE id_orden = $1
    RETURNING 
      id_orden
  `;
};
