/**
 * Agrega un cliente a la tabla Clientes
 *
 * @author Gonzalo Barría
 */

export const insCliente = () => `
  INSERT INTO clientes (
    rut,
    dv,
    razon_social,
    nombre,
    ap_paterno,
    ap_materno,
    email,
    datos_adicionales,
    id_negocio
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING id_cliente
`;
