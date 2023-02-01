/**
 * Modifica el estado de un negocio
 *
 * @author Gonzalo Barría
 */

export const updEstadoNegocio = () => {
  return `
    UPDATE negocios SET 
      id_estado = $2
    WHERE id_negocio = $1
  `;
};
