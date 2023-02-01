import db from '../db';
import almacenes from '../db/almacenes';
import { ESTADOS_ALMACEN, ACCIONES } from '../utils/enums';
import {
  checkParametros,
  getID,
  encodeId,
  limpiaString,
  preQueryData,
  postDataPaginada,
} from '../utils/utiles';

export const insAlmacen = async (req) => {
  const {
    user,
    body: { idTipoAlmacen, glosa, descripcion, direccion },
  } = req;

  try {
    checkParametros({ idTipoAlmacen, glosa, descripcion, direccion });

    const datosAdicionales = { direccion };

    return await db.query(almacenes.insAlmacen(), [
      user.idNegocioActivo,
      idTipoAlmacen,
      limpiaString(glosa),
      limpiaString(descripcion),
      ESTADOS_ALMACEN.HABILITADO,
      datosAdicionales,
    ]);
  } catch (error) {
    throw error;
  }
};

export const getAlmacenes = async (req, idTipoAlmacen) => {
  const { query, user, body } = req;

  try {
    const preData = preQueryData(query);

    const idTA = idTipoAlmacen ?? query?.idTipoAlmacen ?? body?.idTipoAlmacen;

    const { rows } = await db.query(
      almacenes.getAlmacenes(preData.orderBy, preData.search),
      [
        preData.pageSize,
        preData.offset,
        idTA,
        user.idNegocioActivo,
        preData.search,
      ]
    );

    rows.forEach((item) => {
      item.id = encodeId(item.id_almacen);
      item.id_negocio = encodeId(item.id_negocio);
      delete item.id_almacen;
    });

    return postDataPaginada(preData, rows);
  } catch (error) {
    throw error;
  }
};

export const getAlmacen = async (req) => {
  const {
    query: { idAlmacen },
  } = req;

  try {
    const { rows } = await db.query(almacenes.getAlmacen(), [getID(idAlmacen)]);

    rows.forEach((item) => {
      item.id = encodeId(item.id_almacen);
      delete item.id_almacen;
    });

    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const updAlmacen = async (req) => {
  const { body, query, user } = req;
  const { idTipoAlmacen, glosa, descripcion, idEstado, direccion } = body;

  try {
    checkParametros({
      idTipoAlmacen,
      glosa,
      descripcion,
      idEstado,
      direccion,
    });

    const { rows } = await db.query(almacenes.getAlmacen(), [
      getID(query.idAlmacen),
    ]);

    const datosAdicionales = rows[0].datos_adicionales ?? {};
    datosAdicionales.direccion = direccion;

    return await db.query(almacenes.updAlmacen(), [
      getID(query.idAlmacen),
      user.idNegocioActivo,
      limpiaString(glosa),
      limpiaString(descripcion),
      idEstado,
      datosAdicionales,
    ]);
  } catch (error) {
    throw error;
  }
};

export const updEstadoAlmacen = async (idAlmacen, body) => {
  const { action, data } = body;

  try {
    checkParametros({
      action,
      data,
    });

    if (getID(data) !== idAlmacen) return { rowCount: 0 };

    let idEstado = 0;
    switch (action) {
      case ACCIONES.ACTIVACION:
        idEstado = ESTADOS_ALMACEN.HABILITADO;
        break;
      case ACCIONES.ELIMINACION:
        idEstado = ESTADOS_ALMACEN.ELIMINADO;
        break;

      default:
        return { rowCount: 0 };
        break;
    }

    return await db.query(almacenes.updEstadoAlmacen(), [idAlmacen, idEstado]);
  } catch (error) {
    throw error;
  }
};

export const updPhotoAlmacen = async (req) => {
  const idAlmacen = getID(req.body.idAlmacen);
  try {
    let urlPhoto;
    if (req.files && req.files.length > 0 && req.files[0].cloudStoragePublicUrl)
      urlPhoto = req.files[0].cloudStoragePublicUrl;

    const { rows } = await db.query(almacenes.getAlmacen(), [idAlmacen]);

    let datosAdicionales = rows[0].datos_adicionales || {};
    datosAdicionales.imgURL = urlPhoto;

    const cliente = await db.query(almacenes.updPhotoAlmacen(), [
      idAlmacen,
      datosAdicionales,
    ]);

    return cliente;
  } catch (error) {
    throw error;
  }
};

export const checkAlmacen = async (req) => {
  const {
    body: { glosa },
    user: { idNegocioActivo },
  } = req;

  try {
    checkParametros({ glosa });

    return await db.query(almacenes.getAlmacenXGlosa(), [
      limpiaString(glosa),
      idNegocioActivo,
    ]);
  } catch (error) {
    throw error;
  }
};

export const getAlmacenesProducto = async (req) => {
  const { query, user, body } = req;
  const idProducto = query?.idProducto ?? body?.idProducto;

  try {
    const { rows } = await db.query(almacenes.getAlmacenesProducto(), [
      user.idNegocioActivo,
      getID(idProducto),
    ]);

    rows.forEach((item) => {
      item.id = encodeId(item.id_almacen);
      delete item.id_almacen;
    });

    return rows;
  } catch (error) {
    throw error;
  }
};

export const getAlmacenesNoEstaProducto = async (req) => {
  const { query, user } = req;

  try {
    const { rows } = await db.query(almacenes.getAlmacenesNoEstaProducto(), [
      getID(query.idProducto),
      user.idNegocioActivo,
      ESTADOS_ALMACEN.HABILITADO,
    ]);

    rows.forEach((item) => {
      item.id = encodeId(item.id_almacen);
      delete item.id_almacen;
    });

    return rows;
  } catch (error) {
    throw error;
  }
};

export const getAlmacenesActivos = async (req) => {
  const { user } = req;

  try {
    const { rows } = await db.query(almacenes.getAlmacenesEstado(), [
      user.idNegocioActivo,
      ESTADOS_ALMACEN.HABILITADO,
    ]);

    return rows.map((item) => {
      const tmp = { id: encodeId(item.id_almacen), ...item };
      const { id_almacen, ...salida } = tmp;
      return salida;
    });
  } catch (error) {
    throw error;
  }
};

const getCategoríasProductosAlmacen = async (req) => {
  const { query, user } = req;

  const removeDuplicates = (arr) => {
    const unique = [];
    const salida = [];

    arr.forEach((element) => {
      if (!unique.includes(element.id_categoria)) {
        unique.push(element.id_categoria);
        salida.push(element);
      }
    });
    return salida;
  };

  try {
    const { rows } = await db.query(almacenes.getCategoríasProductosAlmacen(), [
      getID(query.idAlmacen),
      user.idNegocioActivo,
      ESTADOS_ALMACEN.HABILITADO,
    ]);

    const categoriasPadre = rows
      .filter((i) => i.id_categoria_padre)
      .map((i) => i.id_categoria_padre);

    const { rows: prodCatPad } = await db.query(
      almacenes.getCategoríasPorPadre(),
      [categoriasPadre]
    );

    const salida = removeDuplicates(rows.concat(prodCatPad));

    salida.forEach((item) => {
      item.id = encodeId(item.id_categoria);
      item.id_categoria_padre = encodeId(item.id_categoria_padre);
      delete item.id_categoria;
    });

    return salida;
  } catch (error) {
    throw error;
  }
};

const updTunnel = async (req) => {
  const {
    body: { idAlmacen, urlTunnel },
  } = req;

  try {
    checkParametros({ idAlmacen, urlTunnel });

    let datosAdicionales = {};
    const { rows } = await db.query(almacenes.getAlmacen(), [idAlmacen]);

    rows.forEach((almacen) => {
      datosAdicionales = almacen.datos_adicionales;
    });

    datosAdicionales = {
      ...datosAdicionales,
      urlTunnel,
    };

    const { rowCount } = await db.query(almacenes.updTunnel(), [
      idAlmacen,
      datosAdicionales,
    ]);

    return rowCount;
  } catch (error) {
    throw error;
  }
};

const almacenComponent = {
  getAlmacenes,
  getAlmacenesActivos,
  getAlmacen,
  getCategoríasProductosAlmacen,
  checkAlmacen,
  insAlmacen,
  updAlmacen,
  updEstadoAlmacen,
  updTunnel,
  updPhotoAlmacen,
  getAlmacenesProducto,
  getAlmacenesNoEstaProducto,
};

export default almacenComponent;
