/**
 * Obtiene la cantidad de ventas que ha tenido durante la última semana
 *
 * @author Gonzalo Barría
 */

export const getOrdenesVentaSemanaMonto = () => `
  SELECT 
    timezone($4, fecha_creacion)::date dia,
    sum(total_venta) monto_diario,
    id_almacen
  FROM ordenes_venta
  WHERE fecha_creacion between $1 AND $2
  AND id_tipo_venta = $3
  group by 1,3
  ORDER BY 1
`;
