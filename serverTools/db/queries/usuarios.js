export const updPassword = () => {
  return 'UPDATE usuarios set password=$2, codigo=NULL WHERE email=$1';
};

export const updCodigo = () => {
  return 'UPDATE usuarios set codigo=$2 WHERE email=$1';
};

export const getUsuarioByEmail = () => {
  return 'SELECT id_usuario, codigo, id_estado, password, id_tipo_ingreso, nombre, ap_paterno "apPaterno", ap_materno "apMaterno" FROM usuarios WHERE email=$1';
};

export const insUsuario = () => {
  return 'INSERT INTO usuarios(email, password, id_estado, id_tipo_ingreso) VALUES($1, $2, $3, $4) RETURNING id_usuario';
};

export const insUsuarioProvider = () => {
  return 'INSERT INTO usuarios(email, password, nombre, ap_paterno, id_estado, id_tipo_ingreso) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id_usuario';
};

export const getRoles = () => {
  return 'SELECT r.id_rol "idRol", r.glosa FROM roles_usuario ru, roles r WHERE id_usuario = $1 AND ru.id_rol = r.id_rol';
};

export const getUsuarioById = () => {
  return 'SELECT email, nombre, ap_paterno "apPaterno", ap_materno "apMaterno" FROM usuarios WHERE id_usuario = $1';
};

export const updDatosPersonales = () => {
  return 'UPDATE usuarios SET nombre=$2, ap_paterno=$3, ap_materno=$4 WHERE id_usuario=$1';
};

export const buscaUsuario = () => {
  return `SELECT id_usuario "idUsuario", nombre, ap_paterno "apPaterno", ap_materno "apMaterno", email 
  FROM usuarios, plainto_tsquery($1) AS q 
  WHERE (tsv_usuario_text @@ q) 
  ORDER BY nombre DESC LIMIT 15;`;
};
