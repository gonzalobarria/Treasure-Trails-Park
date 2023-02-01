/**
 * Agrega una marca a la tabla marcas
 * 
 * @author Gonzalo Barría
 */

export const insMarca = () => {
  return `
    INSERT INTO marcas (
      glosa,
      descripcion,
      datos_adicionales
    )
    VALUES ($1, $2, $3)
    RETURNING id_marca
`;
};
