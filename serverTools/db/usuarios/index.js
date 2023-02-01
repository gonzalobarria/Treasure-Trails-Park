import { getUsuarioByEmail } from './get_usuario_by_email';
import { getFuncionalidesUsuario } from './get_funcionalidades_usuario';
import { getUsuario } from './get_usuario';
import { getUsuariosNegocio } from './get_usuarios_negocio';
import { getUsuarios } from './get_usuarios';
import { getUsuariosOrden } from './get_usuarios_orden';
import { insPermisoUsuario } from './ins_permiso_usuario';
import { insUsuario } from './ins_usuario';
import { isUsuarioNegocio } from './is_usuario_negocio';
import { updEstadoUsuario } from './upd_estado_usuario';
import { updPhotoUsuario } from './upd_photo_usuario';
import { updUsuario } from './upd_usuario';
import { updPasswordUsuario } from './upd_password_usuario';
import { updRefreshTokenUsuario } from './upd_refresh_token_usuario';
import { updCodigo } from './upd_codigo';

const usuarios = {
  getUsuarioByEmail,
  getFuncionalidesUsuario,
  getUsuario,
  getUsuariosNegocio,
  getUsuarios,
  getUsuariosOrden,
  insPermisoUsuario,
  insUsuario,
  isUsuarioNegocio,
  updEstadoUsuario,
  updPhotoUsuario,
  updUsuario,
  updPasswordUsuario,
  updRefreshTokenUsuario,
  updCodigo,
};

export default usuarios;
