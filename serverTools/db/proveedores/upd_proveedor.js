/**
 * Actualiza un proveedor en particular
 * 
 * @author Gonzalo Barría
 */

export const updProveedor = () => {
  return `
    UPDATE proveedores SET 
      glosa = $2,
      descripcion = $3,
      id_estado = $4
    WHERE id_proveedor = $1
`;
};
