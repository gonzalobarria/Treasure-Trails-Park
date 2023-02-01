/**
 * Obtiene todas las marcas sin importar si está activo
 * 
 * @author Gonzalo Barría
 */

export const getMarca = () => {
  return `
    SELECT
      id_marca,
      glosa,
      descripcion,
      datos_adicionales,
      activo
    FROM marcas
    WHERE id_marca = $1
  `;
};
