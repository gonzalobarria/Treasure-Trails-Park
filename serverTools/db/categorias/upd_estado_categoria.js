/**
 * Activa o desactiva una categoria
 *
 * @author Gonzalo Barría
 */

export const updEstadoCategoria = () => {
  return `
    UPDATE categorias SET 
      activo = $2
    WHERE id_categoria = $1
  `;
};
