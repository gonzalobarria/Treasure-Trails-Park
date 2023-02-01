export const getRolesByID = () => {
  return 'SELECT id_rol, glosa FROM roles WHERE id_rol = $1';
};

export const getRoles = () => {
  return 'SELECT id_rol "idRol", glosa FROM roles';
};

export const updGlosa = () => {
  return 'UPDATE roles SET glosa=$2 WHERE id_rol=$1';
};

export const insRol = () => {
  return 'INSERT INTO roles(id_rol, glosa) VALUES ($1, $2) RETURNING id_rol, glosa';
};
