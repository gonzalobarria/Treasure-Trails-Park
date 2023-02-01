/**
 * Obtiene la cantidad de ventas que ha tenido durante la última semana
 *
 * @author Gonzalo Barría
 */

export const getOrdenesVentaSemana = () => `
  SELECT 
    timezone($5, fecha_creacion)::date dia,
    count(*) total_ordenes
  FROM ordenes_venta
  WHERE fecha_creacion between $2 AND $3
  AND id_almacen = $1
  AND id_tipo_venta = $4
  GROUP BY 1
  ORDER BY 1
`;
