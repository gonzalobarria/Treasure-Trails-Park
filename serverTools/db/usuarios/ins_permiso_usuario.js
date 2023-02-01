/**
 * Agrega un usuario a la tabla Usuarios
 * 
 * @author Gonzalo Barría
 */

export const insPermisoUsuario = () => {
  return `
    insert into permisos_usuario (
      id_usuario,
      id_perfil,
      id_negocio
    )
    VALUES ($1, $2, $3)
  `;
};

