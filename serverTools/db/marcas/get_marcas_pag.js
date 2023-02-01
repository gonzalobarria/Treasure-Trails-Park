/**
 * Obtiene todas las marcas sin importar si está activo
 * paginadas
 * 
 * @author Gonzalo Barría
 */

export const getMarcasPag = () => {
  return `
    SELECT 
      id_marca, 
      glosa, 
      descripcion,
      datos_adicionales,
      activo 
    FROM marcas
    WHERE id_marca > $1
    ORDER BY id_marca ASC
    LIMIT $2
  `;
};
