/**
 * Agrega un producto de un almacen a la orden de venta
 * 
 * @author Gonzalo Barría
 */

export const insProductoAlmacenOrdenVenta = () => `
  INSERT INTO productos_orden_venta (
    id_orden_venta,
    id_producto,
    id_almacen,
    id_tipo_venta,
    precio_venta,
    cantidad,
    datos_adicionales
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7)
`;

