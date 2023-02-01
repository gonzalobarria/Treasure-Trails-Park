/**
 * Agrega una relación de Producto con un Almacén
 *
 * @author Gonzalo Barría
 */

export const insProductoOrden = () => `
  INSERT INTO productos_orden (
    id_orden,
    id_producto,
    id_unidad_medida,
    cantidad
  )
  VALUES ($1, $2, $3, $4)
`;
