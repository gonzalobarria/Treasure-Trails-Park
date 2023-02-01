import db from '../db';
import usuarios from '../db/usuarios';
import {
  TIPOS_INGRESO,
  ESTADOS_USUARIO,
  FUNCIONALIDADES,
} from '../utils/enums';
import {
  limpiaString,
  getID,
  encodeId,
  checkParametros,
  createRefreshToken,
  preQueryData,
  postDataPaginada,
} from '../utils/utiles';

export const getUsuarioByEmail = async (email) => {
  try {
    const { rows } = await db.query(usuarios.getUsuarioByEmail(), [
      limpiaString(email),
    ]);

    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const getUsuario = async (idUsuario) => {
  try {
    const { rows } = await db.query(usuarios.getUsuario(), [idUsuario]);

    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const getFuncionalidesUsuario = async (idUsuario) => {
  try {
    const { rows } = await db.query(usuarios.getFuncionalidesUsuario(), [
      idUsuario,
    ]);

    return { rows };
  } catch (error) {
    throw error;
  }
};

export const insUsuario = async (req) => {
  const client = await db.pool.connect();
  const { user, body } = req;

  const idNegocio = user.idNegocioActivo;

  const { nombre, apPaterno, apMaterno, email } = body;

  try {
    checkParametros({
      nombre,
      apPaterno,
      apMaterno,
      email,
    });

    await client.query('BEGIN');

    const usuario = await client.query(usuarios.insUsuario(), [
      nombre,
      apPaterno,
      apMaterno,
      email,
      TIPOS_INGRESO.CONCLAVE,
      ESTADOS_USUARIO.ACTIVO,
    ]);

    const idUsuario = usuario.rows[0].id_usuario;

    const permisos = await client.query(usuarios.insPermisoUsuario(), [
      idUsuario,
      302,
      idNegocio,
    ]);

    await client.query('COMMIT');

    return permisos;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const getUsuariosNegocio = async (req) => {
  const { query, user } = req;

  try {
    const preData = preQueryData(query);

    const { rows } = await db.query(
      usuarios.getUsuariosNegocio(preData.orderBy, preData.search),
      [preData.pageSize, preData.offset, preData.search, user.idNegocioActivo]
    );

    rows.forEach((item) => {
      item.id = encodeId(item.id_usuario);
      delete item['id_usuario'];
    });

    return postDataPaginada(preData, rows);
  } catch (error) {
    throw error;
  }
};

export const getUsuarios = async () => {
  try {
    const { rows } = await db.query(usuarios.getUsuarios(), []);

    rows.forEach((usuario) => {
      usuario.id_usuario = encodeId(usuario.id_usuario);
    });

    return { rows };
  } catch (error) {
    throw error;
  }
};

const checkUsuarioNegocio = async (idUsuario, idNegocio) => {
  try {
    const data = await db.query(usuarios.isUsuarioNegocio(), [
      idUsuario,
      idNegocio,
    ]);

    if (data.rowCount === 0) throw new Error(`Usuario no pertenece al Negocio`);
  } catch (error) {
    throw error;
  }
};

export const getUsuarioNegocio = async (req) => {
  const idUsuario = getID(req.query.idUsuario);
  const idNegocio = req.user.idNegocioActivo;

  try {
    await checkUsuarioNegocio(idUsuario, idNegocio);

    const { rows } = await db.query(usuarios.getUsuario(), [idUsuario]);

    rows.forEach((usuario) => {
      usuario.id_usuario = encodeId(usuario.id_usuario);
    });

    return { rows };
  } catch (error) {
    throw error;
  }
};

export const updEstadoUsuario = async (req) => {
  const { activo } = req.body;
  const idUsuario = getID(req.query.idUsuario);
  const idNegocio = req.user.idNegocioActivo;

  try {
    await checkUsuarioNegocio(idUsuario, idNegocio);

    checkParametros({ activo });

    const { rowCount } = await db.query(usuarios.updEstadoUsuario(), [
      idUsuario,
      activo,
    ]);

    return { rowCount };
  } catch (error) {
    throw error;
  }
};

export const updUsuario = async (req) => {
  const {
    body: { nombre, apPaterno, apMaterno, email, idEstado },
    query: { idUsuario },
    user: { idNegocioActivo },
  } = req;

  try {
    await checkUsuarioNegocio(getID(idUsuario), idNegocioActivo);

    checkParametros({
      nombre,
      apPaterno,
      apMaterno,
      email,
      idEstado,
    });

    return await db.query(usuarios.updUsuario(), [
      getID(idUsuario),
      nombre,
      apPaterno,
      apMaterno,
      email,
      idEstado,
    ]);
  } catch (error) {
    throw error;
  }
};

export const updPhotoUsuario = async (req) => {
  const idUsuario = getID(req.body.idUsuario);
  try {
    let urlPhoto;
    if (req.files && req.files.length > 0 && req.files[0].cloudStoragePublicUrl)
      urlPhoto = req.files[0].cloudStoragePublicUrl;

    const { rows } = await db.query(usuarios.getUsuario(), [idUsuario]);

    let datosAdicionales = rows[0].datos_adicionales || {};
    datosAdicionales.imgURL = urlPhoto;

    return await db.query(usuarios.updPhotoUsuario(), [
      idUsuario,
      datosAdicionales,
    ]);
  } catch (error) {
    throw error;
  }
};

export const checkUsuario = async (req) => {
  const { email } = req.body;

  try {
    checkParametros({ email });

    return await db.query(usuarios.getUsuarioByEmail(), [limpiaString(email)]);
  } catch (error) {
    throw error;
  }
};

export const getUsuariosOrden = async (req) => {
  const { user } = req;
  try {
    const { rows } = await db.query(usuarios.getUsuariosOrden(), [
      user.idNegocioActivo,
      ESTADOS_USUARIO.ACTIVO,
      [FUNCIONALIDADES.Crear_Orden, FUNCIONALIDADES.Actualizar_Orden],
    ]);

    return rows.map((item) => {
      const res = {
        id: encodeId(item.id_usuario),
        ...item,
      };
      const { id_usuario, ...salida } = res;
      return salida;
    });
  } catch (error) {
    throw error;
  }
};

export const updPasswordUsuario = async (email, password) => {
  try {
    const { rows } = await db.query(usuarios.updPasswordUsuario(), [
      email,
      password,
    ]);

    return rows;
  } catch (error) {
    throw error;
  }
};

export const updateRefreshToken = async (usuario) => {
  try {
    const refreshToken = createRefreshToken({
      id: encodeId(usuario.id_usuario),
    });

    let refreshTokenArray = [];

    if (usuario.refresh_token) refreshTokenArray = usuario.refresh_token;

    refreshTokenArray.push(refreshToken);

    await db.query(usuarios.updRefreshTokenUsuario(), [
      usuario.id_usuario,
      refreshTokenArray,
    ]);

    return refreshToken;
  } catch (error) {
    throw error;
  }
};

const usuarioComponent = {
  getUsuarioByEmail,
  getUsuario,
  getFuncionalidesUsuario,
  insUsuario,
  getUsuariosNegocio,
  getUsuarios,
  getUsuarioNegocio,
  updEstadoUsuario,
  updUsuario,
  updPhotoUsuario,
  checkUsuario,
  getUsuariosOrden,
  updPasswordUsuario,
  updateRefreshToken,
};

export default usuarioComponent;
