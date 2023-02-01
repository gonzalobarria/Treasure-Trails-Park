/**
 * Actualiza el usuario que recibe la orden
 *
 * @author Gonzalo Barría
 */

const { ESTADOS_ORDEN } = require('../../utils/enums');

export const updOrdenUsuarioReceptor = () => {
  return `
    UPDATE ordenes
    SET id_usuario_receptor = $3,
    id_estado = ${ESTADOS_ORDEN.ENVIADO}
    WHERE id_orden = $1
    AND id_negocio = $2
  `;
};
