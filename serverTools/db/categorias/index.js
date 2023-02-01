const { getCategoria } = require('./get_categoria');
const { getCategoriasActivas } = require('./get_categorias_activas');
const { getCategorias } = require('./get_categorias');
const { getCategoriaXGlosa } = require('./get_categoria_glosa');
const { insCategoria } = require('./ins_categoria');
const { updEstadoCategoria } = require('./upd_estado_categoria');
const { updCategoria } = require('./upd_categoria');
const { updPhotoCategoria } = require('./upd_photo_categoria');
const { getCategoriasTodas } = require('./get_categorias_todas');

const categorias = {
  getCategoria,
  getCategoriasActivas,
  getCategorias,
  getCategoriaXGlosa,
  insCategoria,
  updEstadoCategoria,
  updCategoria,
  updPhotoCategoria,
  getCategoriasTodas,
};

export default categorias;
