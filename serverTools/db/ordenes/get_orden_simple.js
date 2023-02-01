/**
 * Obtiene una orden simple
 *
 * @author Gonzalo Barría
 */

export const getOrdenSimple = () => `
  SELECT
    id_orden,
    id_negocio,
    id_estado,
    datos_adicionales,
    es_interno,
    id_origen
  FROM ordenes
  WHERE id_orden = $1
  AND id_negocio = $2
`;
