/**
 * Obtiene un listado de los productos mejor vendidos de la semana
 *
 * @author Gonzalo Barría
 */

export const getProductosMejorVendidos = () => `
  SELECT 
    pa.id_producto,
    p.glosa,
    stock_disponible,
    cant_ventas
  FROM productos_almacen pa
  INNER JOIN productos p USING(id_producto)
  INNER JOIN (
    SELECT 
      id_producto,
      sum(cantidad) cant_ventas
    FROM productos_orden_venta
    INNER JOIN ordenes_venta ov USING(id_orden_venta)
    WHERE fecha_creacion between $2 AND $3
    AND ov.id_almacen = $1
    AND ov.id_tipo_venta = $4
    GROUP BY id_producto
  ) AS va USING(id_producto)
  WHERE id_almacen = $1
  ORDER BY cant_ventas DESC
`;
