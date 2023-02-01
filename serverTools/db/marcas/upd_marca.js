/**
 * Actualiza una marca en particular
 * 
 * @author Gonzalo Barría
 */

export const updMarca = () => {
  return `
    UPDATE marcas SET 
      glosa = $2,
      descripcion = $3,
      activo = $4
    WHERE id_marca = $1
`;
};
