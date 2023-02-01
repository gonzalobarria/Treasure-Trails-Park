/**
 * Obtiene todos los proveedores sin importar si está activo
 * 
 * @author Gonzalo Barría
 */

export const getProveedores = (orderBy, search) => {
  let columna = 'p.glosa';
  switch (parseInt(orderBy)) {
    case 3:
      columna = 'p.id_estado, p.glosa';
    default:
      break;
  }

  return `
    SELECT 
      id_proveedor, 
      p.glosa, 
      descripcion,
      datos_adicionales,
      id_region,
      id_comuna,
      id_ciudad,
      id_estado,
      ep.glosa glosa_estado,
      count(*) OVER() AS total
    FROM proveedores p
    INNER JOIN estados_proveedor ep USING(id_estado)
    WHERE (tsv_proveedor_text @@ plainto_tsquery($3) or ${search === undefined})
    ORDER BY ${columna}
    LIMIT $1
    OFFSET $2;
  `;
};
