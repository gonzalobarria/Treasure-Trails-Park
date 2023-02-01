/**
 * Crea una orden de venta
 * 
 * @author Gonzalo Barría
 */

export const insOrdenVenta = () =>  `
  INSERT INTO ordenes_venta (
    id_almacen,
    id_usuario_cajero,
    id_cliente,
    total_venta,
    datos_adicionales,
    id_tipo_venta,
    id_tipo_pago,
    id_estado
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING id_orden_venta
`;
