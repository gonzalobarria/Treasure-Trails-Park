/**
 * Actualiza el cliente de la venta
 *
 * @author Gonzalo Barría
 */

export const updOrdenVentaCliente = () => {
  return `
    UPDATE ordenes_venta
      SET id_cliente = $2
    WHERE id_orden_venta = $1
  `;
};
