/**
 * Obtiene todos los clientes del negocio
 * 
 * @author Gonzalo Barría
 */

export const getCliente = () => `
  SELECT 
    id_cliente,
    rut,
    dv,
    razon_social,
    nombre,
    ap_paterno,
    ap_materno,
    email,
    datos_adicionales,
    activo
  FROM clientes
  WHERE id_cliente = $1
`;
