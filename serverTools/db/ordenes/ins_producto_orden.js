/**
 * Agrega un producto a la orden
 *
 * @author Gonzalo Barría
 */

export const insProductoOrden = () => `
  INSERT INTO productos_orden (
    id_orden,
    id_producto,
    cantidad,
    id_unidad_medida
  )
  VALUES ($1, $2, $3, $4)
`;
