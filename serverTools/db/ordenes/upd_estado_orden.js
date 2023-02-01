/**
 * Activa o desactiva un producto
 *
 * @author Gonzalo Barría
 */

export const updEstadoOrden = () => {
  return `
    UPDATE ordenes SET 
      id_estado = $3
    WHERE id_orden = $1
    AND id_negocio = $2
  `;
};
