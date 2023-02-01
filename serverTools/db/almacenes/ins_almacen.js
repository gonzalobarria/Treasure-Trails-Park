/**
 * Crea un nuevo Almacen
 *
 * @author Gonzalo Barría
 */

export const insAlmacen = () => `
  INSERT INTO almacenes (
    id_negocio,
    id_tipo_almacen,
    glosa,
    descripcion,
    id_estado,
    datos_adicionales
  )
  VALUES ($1, $2, $3, $4, $5, $6)
`;
