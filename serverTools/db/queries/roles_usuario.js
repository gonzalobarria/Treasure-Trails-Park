export const insRolUsuario = () => {
  return 'INSERT INTO roles_usuario(id_usuario, id_rol) VALUES ($1, $2)';
};

