import db from '../db';
import proveedores from '../db/proveedores';
import {
  encodeId,
  checkParametros,
  getID,
  limpiaString,
  preQueryData,
  postDataPaginada,
} from '../utils/utiles';
import { ESTADOS_PROVEEDOR } from '../utils/enums';

export const insProveedor = async (body) => {
  const {
    glosa,
    descripcion,
    datosAdicionales,
    // idRegion,
    // idComuna,
    // idCiudad,
    // isEstado,
  } = body;

  try {
    checkParametros({
      glosa,
      descripcion,
      datosAdicionales,
      // idRegion,
      // idComuna,
      // idCiudad,
    });

    const { rows } = await db.query(proveedores.insProveedor(), [
      glosa,
      descripcion,
      datosAdicionales,
      // idRegion,
      // idComuna,
      // idCiudad,
      ESTADOS_PROVEEDOR.ACTIVO,
    ]);

    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const getProveedores = async (req) => {
  const { query } = req;

  try {
    const preData = preQueryData(query);

    const { rows } = await db.query(
      proveedores.getProveedores(preData.orderBy, preData.search),
      [preData.pageSize, preData.offset, preData.search]
    );

    rows.forEach((item) => {
      item.id = encodeId(item.id_proveedor);
      delete item['id_proveedor'];
    });

    return postDataPaginada(preData, rows);
  } catch (error) {
    throw error;
  }
};

export const getProveedoresActivos = async () => {
  try {
    const { rows } = await db.query(proveedores.getProveedoresActivos(), []);

    const provTmp = rows.filter((proveedor) => proveedor.id_proveedor !== 1);

    provTmp.forEach((proveedor) => {
      proveedor.id = encodeId(proveedor.id_proveedor);
      delete proveedor['id_proveedor'];
    });

    return provTmp;
  } catch (error) {
    throw error;
  }
};

export const getProveedor = async (idProveedor) => {
  try {
    const { rows } = await db.query(proveedores.getProveedor(), [idProveedor]);

    rows.forEach((proveedor) => {
      proveedor.id_proveedor = encodeId(proveedor.id_proveedor);
    });

    return { rows };
  } catch (error) {
    throw error;
  }
};

export const updEstadoProveedor = async (idProveedor, body) => {
  const { idEstado } = body;

  try {
    checkParametros({ idEstado });

    const { rowCount } = await db.query(proveedores.updEstadoProveedor(), [
      idProveedor,
      idEstado,
    ]);

    return { rowCount };
  } catch (error) {
    throw error;
  }
};

export const updProveedor = async (req) => {
  const { body, query } = req;
  const { glosa, descripcion, idEstado } = body;

  try {
    checkParametros({
      glosa,
      descripcion,
      idEstado,
    });

    return await db.query(proveedores.updProveedor(), [
      getID(query.idProveedor),
      glosa,
      descripcion,
      idEstado,
    ]);
  } catch (error) {
    throw error;
  }
};

export const updPhotoProveedor = async (req) => {
  const idProveedor = getID(req.body.idProveedor);
  try {
    let urlPhoto;
    if (req.files && req.files.length > 0 && req.files[0].cloudStoragePublicUrl)
      urlPhoto = req.files[0].cloudStoragePublicUrl;

    const { rows } = await db.query(proveedores.getProveedor(), [idProveedor]);

    let datosAdicionales = rows[0].datos_adicionales || {};
    datosAdicionales.imgURL = urlPhoto;

    const cliente = await db.query(proveedores.updPhotoProveedor(), [
      idProveedor,
      datosAdicionales,
    ]);

    return cliente;
  } catch (error) {
    throw error;
  }
};

export const checkProveedor = async (req) => {
  const { glosa } = req.body;

  try {
    checkParametros({ glosa });

    return await db.query(proveedores.getProveedorXGlosa(), [
      limpiaString(glosa),
    ]);
  } catch (error) {
    throw error;
  }
};

const proveedorComponent = {
  insProveedor,
  getProveedores,
  getProveedoresActivos,
  getProveedor,
  updEstadoProveedor,
  updProveedor,
  updPhotoProveedor,
  checkProveedor,
};

export default proveedorComponent;
