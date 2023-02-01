/**
 * Agrega un negocio al sistema
 * 
 * @author Gonzalo Barría
 */

export const insNegocio = () => {
  return `
    INSERT INTO negocios (
      rut_negocio,
      id_division,
      glosa,
      glosa_division,
      datos_adicionales,
      id_region,
      id_comuna,
      id_ciudad,
      id_estado
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id_negocio
`;
};
