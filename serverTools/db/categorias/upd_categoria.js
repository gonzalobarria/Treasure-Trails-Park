/**
 * Actualiza una categoria en particular
 *
 * @author Gonzalo Barría
 */

export const updCategoria = () => `
  UPDATE categorias SET 
    glosa = $2,
    id_categoria_padre = $3,
    activo = $4
  WHERE id_categoria = $1
`;
