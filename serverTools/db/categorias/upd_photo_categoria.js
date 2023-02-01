/**
 * Actualiza la imagen de un cliente
 *
 * @author Gonzalo Barría
 */

export const updPhotoCategoria = () => {
  return `
    UPDATE categorias SET
      datos_adicionales = $2
    WHERE id_categoria = $1
    RETURNING 
      id_categoria,
      glosa,
      id_categoria_padre,
      datos_adicionales,
      activo
  `;
};
