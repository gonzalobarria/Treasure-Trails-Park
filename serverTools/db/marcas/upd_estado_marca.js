/**
 * Activa o desactiva una marca
 *
 * @author Gonzalo Barría
 */

export const updEstadoMarca = () => {
  return `
    UPDATE marcas SET 
      activo = $2
    WHERE id_marca = $1
  `;
};
