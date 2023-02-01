/**
 * Obtiene todos los tipos de almacen
 * 
 * @author Gonzalo Barría
 */

export const getTiposAlmacen = () => {
  return `
    SELECT 
      id_tipo_almacen, 
      glosa
    FROM tipos_almacen
    ORDER BY glosa
  `;
};
