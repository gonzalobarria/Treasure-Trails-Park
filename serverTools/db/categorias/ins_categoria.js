/**
 * Agrega una categoria a la tabla categorias
 * 
 * @author Gonzalo Barría
 */

export const insCategoria = () => {
  return `
    INSERT INTO categorias (
      glosa,
      id_categoria_padre,
      datos_adicionales
    )
    VALUES ($1, $2, $3)
    RETURNING id_categoria
`;
};
