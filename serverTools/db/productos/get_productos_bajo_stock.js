/**
 * Devuelve productos que están bajo cierto stock
 *
 * @author Gonzalo Barría
 */

export const getProductosBajoStock = () => `
  SELECT
		p.id_producto,
		p.glosa glosa_producto,
		a.id_almacen,
		a.glosa glosa_almacen,
		a.id_tipo_almacen,
		stock_disponible
	FROM productos_almacen
	INNER JOIN productos p USING(id_producto)
	INNER JOIN almacenes a USING(id_almacen)
	WHERE a.id_negocio = $1
	AND stock_disponible <= $2
	AND p.activo = $3
	AND a.id_estado = $4
	ORDER BY glosa_producto, glosa_almacen 
`;
