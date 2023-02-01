/**
 * Agrega un Proveedor a la tabla proveedores
 * 
 * @author Gonzalo Barría
 */

export const insProveedor = () => {
  return `
    INSERT INTO proveedores (
        glosa,
        descripcion,
        datos_adicionales,
        id_estado
    )
    VALUES ($1, $2, $3, $4)
    RETURNING id_proveedor
`;
};
