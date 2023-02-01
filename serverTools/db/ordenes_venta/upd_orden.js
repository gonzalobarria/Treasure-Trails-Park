/**
 * Actualiza un producto en particular
 * 
 * @author Gonzalo Barría
 */

export const updOrden = () => {
  return `
    UPDATE producto SET 
      glosa = $2,
      descripcion = $3,
      datos_adicionales = $4,
      activo = $5,
      id_marca = $6
    WHERE id_producto = $1
`;
};
