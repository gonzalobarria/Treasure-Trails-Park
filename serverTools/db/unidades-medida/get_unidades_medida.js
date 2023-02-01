/**
 * Lista paginada de productos
 *
 * @author Gonzalo Barría
 */

export const getUnidadesMedida = (orderBy) => {
  let columna = 'glosa';
  switch (parseInt(orderBy)) {
    case 3:
      columna = 'activo, glosa';
    default:
      break;
  }

  return `
    SELECT
      id_unidad_medida,
      glosa
    FROM unidades_medida
    ORDER BY ${columna}
  `;
};
