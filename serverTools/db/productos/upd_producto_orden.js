/**
 * Actualiza un producto de una orden
 *
 * @author Gonzalo Barría
 */

export const updProductoOrden = () => `
  UPDATE productos_orden SET 
    cantidad = $3,
    id_unidad_medida = $4,
    datos_adicionales = $5
  WHERE id_orden = $1
  AND id_producto = $2
`;
