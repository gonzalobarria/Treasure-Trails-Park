/**
 * Actualiza la imagen de un cliente
 *
 * @author Gonzalo Barría
 */

export const updPhotoCliente = () => {
  return `
    UPDATE clientes SET
      datos_adicionales = $2
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
};
