import { ESTADOS_BOOLEAN } from 'serverTools/utils/enums';
import db from '../db';
import marcas from '../db/marcas';
import {
  encodeId,
  checkParametros,
  getID,
  limpiaString,
  preQueryData,
  postDataPaginada,
} from '../utils/utiles';

export const insMarca = async (body) => {
  const { glosa, descripcion, datosAdicionales } = body;

  try {
    checkParametros({ glosa, descripcion, datosAdicionales });

    const { rows } = await db.query(marcas.insMarca(), [
      limpiaString(glosa),
      limpiaString(descripcion),
      datosAdicionales,
    ]);

    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const getMarcas = async (req) => {
  const { query } = req;

  try {
    const preData = preQueryData(query);

    const { rows } = await db.query(
      marcas.getMarcas(preData.orderBy, preData.search),
      [preData.pageSize, preData.offset, preData.search]
    );

    rows.forEach((item) => {
      item.id = encodeId(item.id_marca);
      delete item['id_marca'];
    });

    return postDataPaginada(preData, rows);
  } catch (error) {
    throw error;
  }
};

export const getMarcasActivas = async () => {
  try {
    const { rows } = await db.query(marcas.getMarcasActivas(), [
      ESTADOS_BOOLEAN.ACTIVO,
    ]);

    rows.forEach((item) => {
      item.id = encodeId(item.id_marca);
      delete item.id_marca;
    });

    return [{ id: '', glosa: 'Sin Marca' }, ...rows];
  } catch (error) {
    throw error;
  }
};

export const getMarca = async (idMarca) => {
  try {
    const { rows } = await db.query(marcas.getMarca(), [idMarca]);

    rows.forEach((marca) => {
      marca.id_marca = encodeId(marca.id_marca);
    });

    return { rows };
  } catch (error) {
    throw error;
  }
};

export const updEstadoMarca = async (idMarca, body) => {
  const { activo } = body;

  try {
    checkParametros({ activo });

    const { rowCount } = await db.query(marcas.updEstadoMarca(), [
      idMarca,
      activo,
    ]);

    return { rowCount };
  } catch (error) {
    throw error;
  }
};

export const updMarca = async (req) => {
  const { body, query } = req;
  const { glosa, descripcion, activo } = body;

  try {
    checkParametros({
      glosa,
      descripcion,
      activo,
    });

    const { rowCount } = await db.query(marcas.updMarca(), [
      getID(query.idMarca),
      limpiaString(glosa),
      limpiaString(descripcion),
      activo,
    ]);

    return { rowCount };
  } catch (error) {
    throw error;
  }
};

export const updPhotoMarca = async (req) => {
  const idMarca = getID(req.body.idMarca);
  try {
    let urlPhoto;
    if (req.files && req.files.length > 0 && req.files[0].cloudStoragePublicUrl)
      urlPhoto = req.files[0].cloudStoragePublicUrl;

    const { rows } = await db.query(marcas.getMarca(), [idMarca]);

    let datosAdicionales = rows[0].datos_adicionales || {};
    datosAdicionales.imgURL = urlPhoto;

    const cliente = await db.query(marcas.updPhotoMarca(), [
      idMarca,
      datosAdicionales,
    ]);

    return cliente;
  } catch (error) {
    throw error;
  }
};

export const checkMarca = async (req) => {
  const { glosa } = req.body;

  try {
    checkParametros({ glosa });

    return await db.query(marcas.getMarcaXGlosa(), [limpiaString(glosa)]);
  } catch (error) {
    throw error;
  }
};

const marcaComponent = {
  insMarca,
  getMarcas,
  getMarcasActivas,
  getMarca,
  updEstadoMarca,
  updMarca,
  updPhotoMarca,
  checkMarca,
};

export default marcaComponent;
