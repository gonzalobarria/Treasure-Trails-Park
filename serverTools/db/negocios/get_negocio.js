/**
 * Obtiene todos los negocios sin importar si está activo
 * 
 * @author Gonzalo Barría
 */

export const getNegocio = () => {
  return `
    SELECT
      id_negocio,
      rut_negocio,
      id_division,
      glosa,
      glosa_division,
      datos_adicionales,
      fecha_creacion,
      id_region,
      id_comuna,
      id_ciudad,
      id_estado
    FROM negocios
    WHERE id_negocio = $1
  `;
};
