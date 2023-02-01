/**
 * Actualiza el estado de un proveedor
 *
 * @author Gonzalo Barría
 */

export const updEstadoProveedor = () => {
  return `
    UPDATE proveedores SET 
      id_estado = $2
    WHERE id_proveedor = $1
  `;
};
