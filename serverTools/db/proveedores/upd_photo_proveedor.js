/**
 * Actualiza la imagen de un cliente
 *
 * @author Gonzalo Barría
 */

export const updPhotoProveedor = () => {
  return `
    UPDATE proveedores SET
      datos_adicionales = $2
    WHERE id_proveedor = $1
    RETURNING 
      id_proveedor,
      glosa,
      descripcion,
      datos_adicionales,
      id_region,
      id_comuna,
      id_ciudad,
      id_estado
  `;
};
