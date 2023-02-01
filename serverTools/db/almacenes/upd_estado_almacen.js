/**
 * Actualiza el estado de un Almacén
 * 
 * @author Gonzalo Barría
 */

export const updEstadoAlmacen = () => {
  return `
    UPDATE almacenes SET 
      id_estado = $2
    WHERE id_almacen = $1
    RETURNING id_tipo_almacen
`;
};
