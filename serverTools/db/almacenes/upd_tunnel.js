/**
 * Actualiza los datosAdicionales de un almacen
 *
 * @author Gonzalo Barría
 */

export const updTunnel = () => `
  UPDATE almacenes SET 
    datos_adicionales = $2
  WHERE id_almacen = $1
`;
