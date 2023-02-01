/**
 * Actualiza un negocio en particular
 * 
 * @author Gonzalo Barría
 */

export const updNegocio = () => {
  return `
    UPDATE negocios SET 
      rut_negocio = $2,
      id_division = $3,
      glosa = $4,
      glosa_division = $5,
      datos_adicionales = $6,
      id_region = $7,
      id_comuna = $8,
      id_ciudad = $9,
      id_estado = $10
    WHERE id_negocio = $1
`;
};
