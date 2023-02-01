/**
 * Agrega un Producto s un Almacén
 *
 * @author Gonzalo Barría
 */

export const insProductoAlmacen = () => `
  INSERT INTO productos_almacen (
    id_almacen,
    id_producto,
    stock_disponible
  )
  VALUES ($1, $2, $3)
`;
