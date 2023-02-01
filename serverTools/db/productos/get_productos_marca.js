/**
 * Obtiene los productos asociados a una marca
 *
 * @author Gonzalo Barría
 */

export const getProductosMarca = () => {
  return `
    SELECT 
      id_producto,
      id_marca,
      p.glosa,
      p.descripcion,
      p.activo
    FROM marcas
    INNER JOIN productos p USING(id_marca)
    WHERE id_marca = $1
    order by p.glosa
  `;
};
