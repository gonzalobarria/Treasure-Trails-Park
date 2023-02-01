/**
 * Agrega un producto  a la tabla productos
 * 
 * @author Gonzalo Barría
 */

export const insOrden = () => {
  return `
    INSERT INTO ordenes (
      id_negocio,
      id_usuario_emisor,
      id_usuario_receptor,
      id_origen,
      id_destino,
      datos_adicionales,
      es_interno,
      id_estado
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id_orden
`;
};
