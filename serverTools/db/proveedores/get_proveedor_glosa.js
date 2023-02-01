/**
 * Obtiene una marca por la glosa
 *
 * @author Gonzalo Barría
 */

export const getProveedorXGlosa = () => {
  return `
    SELECT
      id_proveedor
    FROM proveedores
    WHERE LOWER(glosa) = LOWER($1)
  `;
};
