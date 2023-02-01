/**
 * Obtiene los productos asociados a una categoria
 *
 * @author Gonzalo Barría
 */

export const getProductosCategoria = () =>  `
  SELECT 
    id_producto,
    id_categoria,
    c.glosa glosa_categoria,
    p.glosa,
    p.descripcion,
    p.activo
  FROM categorias c
  INNER JOIN productos p USING(id_categoria)
  WHERE (
    id_categoria = $1
    OR id_categoria IN (
      SELECT id_categoria FROM categorias 
      WHERE id_categoria_padre = $1
    )
  )
  order by p.glosa
`;
