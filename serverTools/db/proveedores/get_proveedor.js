/**
 * Obtiene todos los proveedores inscritas sin importar si está activo
 * 
 * @author Gonzalo Barría
 */

export const getProveedor = () => {
  return `
    SELECT
      id_proveedor,
      glosa,
      descripcion,
      datos_adicionales,
      id_region,
      id_comuna,
      id_ciudad,
      id_estado
    FROM proveedores
    WHERE id_proveedor = $1
  `;
};
