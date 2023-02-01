/**
 * Actualiza un cliente
 *
 * @author Gonzalo Barría
 */

export const updCliente = () => `
  UPDATE clientes SET
    razon_social = $2,
    nombre = $3,
    ap_paterno = $4,
    ap_materno = $5,
    email = $6,
    datos_adicionales = $7,
    activo = $8,
    rut = $9,
    dv = $10
  WHERE id_cliente = $1
  RETURNING 
    id_cliente,
    rut,
    dv,
    nombre,
    ap_paterno,
    ap_materno,
    email,
    datos_adicionales,
    activo
`;
