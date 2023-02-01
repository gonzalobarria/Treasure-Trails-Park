import { ESTADOS_BOOLEAN } from 'serverTools/utils/enums';
import db from '../db';
import categorias from '../db/categorias';
import {
  encodeId,
  checkParametros,
  getID,
  limpiaString,
  preQueryData,
  postDataPaginada,
} from '../utils/utiles';

export const insCategoria = async (body) => {
  const { glosa, idCategoriaPadre, datosAdicionales } = body;

  try {
    checkParametros({ glosa, datosAdicionales });

    const { rows } = await db.query(categorias.insCategoria(), [
      limpiaString(glosa),
      idCategoriaPadre ? getID(idCategoriaPadre) : null,
      datosAdicionales,
    ]);

    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const getCategorias = async (req) => {
  const { query } = req;

  try {
    const preData = preQueryData(query);

    const { rows } = await db.query(
      categorias.getCategorias(preData.orderBy, preData.search),
      [preData.pageSize, preData.offset, preData.search]
    );

    rows.forEach((item) => {
      item.id = encodeId(item.id_categoria);
      delete item['id_categoria'];
    });

    return postDataPaginada(preData, rows);
  } catch (error) {
    throw error;
  }
};

export const getCategoriasActivas = async () => {
  try {
    const { rows } = await db.query(categorias.getCategoriasActivas(), [
      ESTADOS_BOOLEAN.ACTIVO,
    ]);

    rows.forEach((item) => {
      item.id = encodeId(item.id_categoria);
      delete item.id_categoria;
    });

    return [{ id: '', glosa: 'Sin Categoria' }, ...rows];
  } catch (error) {
    throw error;
  }
};

export const getCategoriasTodas = async () => {
  try {
    const { rows } = await db.query(categorias.getCategoriasTodas(), []);

    rows.forEach((categoria) => {
      categoria.id = encodeId(categoria.id_categoria);
      categoria.id_categoria_padre = encodeId(categoria.id_categoria_padre);
      delete categoria['id_categoria'];
    });

    return rows;
  } catch (error) {
    throw error;
  }
};

export const getCategoria = async (idCategoria) => {
  try {
    const { rows } = await db.query(categorias.getCategoria(), [idCategoria]);

    rows.forEach((categoria) => {
      categoria.id_categoria = encodeId(categoria.id_categoria);
      categoria.id_categoria_padre = encodeId(categoria.id_categoria_padre);
    });

    return { rows };
  } catch (error) {
    throw error;
  }
};

export const updEstadoCategoria = async (idCategoria, body) => {
  const { activo } = body;

  try {
    checkParametros({ activo });

    const { rowCount } = await db.query(categorias.updEstadoCategoria(), [
      idCategoria,
      activo,
    ]);

    return { rowCount };
  } catch (error) {
    throw error;
  }
};

export const updCategoria = async (req) => {
  const { body, query } = req;
  const { glosa, idCategoriaPadre, activo } = body;

  try {
    checkParametros({
      glosa,
      activo,
    });

    const { rowCount } = await db.query(categorias.updCategoria(), [
      getID(query.idCategoria),
      limpiaString(glosa),
      idCategoriaPadre ? getID(idCategoriaPadre) : null,
      activo,
    ]);

    return { rowCount };
  } catch (error) {
    throw error;
  }
};

export const updPhotoCategoria = async (req) => {
  const idCategoria = getID(req.body.idCategoria);
  try {
    let urlPhoto;
    if (req.files && req.files.length > 0 && req.files[0].cloudStoragePublicUrl)
      urlPhoto = req.files[0].cloudStoragePublicUrl;

    const { rows } = await db.query(categorias.getCategoria(), [idCategoria]);

    let datosAdicionales = rows[0].datos_adicionales || {};
    datosAdicionales.imgURL = urlPhoto;

    const cliente = await db.query(categorias.updPhotoCategoria(), [
      idCategoria,
      datosAdicionales,
    ]);

    return cliente;
  } catch (error) {
    throw error;
  }
};

export const checkCategoria = async (req) => {
  const { glosa } = req.body;

  try {
    checkParametros({ glosa });

    return await db.query(categorias.getCategoriaXGlosa(), [
      limpiaString(glosa),
    ]);
  } catch (error) {
    throw error;
  }
};

const categoriaComponent = {
  insCategoria,
  getCategorias,
  getCategoriasActivas,
  getCategoriasTodas,
  getCategoria,
  updEstadoCategoria,
  updCategoria,
  updPhotoCategoria,
  checkCategoria,
};

export default categoriaComponent;
