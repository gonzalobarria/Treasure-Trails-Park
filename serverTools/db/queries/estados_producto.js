export const getEstadosProducto = () => {
  return 'SELECT id_estado "idEstado", glosa FROM estados_producto';
};

export const getEstadoProducto = () => {
  return 'SELECT id_estado "idEstado", glosa FROM estados_producto WHERE id_estado = $1';
};

