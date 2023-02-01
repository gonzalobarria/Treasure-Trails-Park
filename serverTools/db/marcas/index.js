const { getMarca } = require('./get_marca');
const { getMarcasActivas } = require('./get_marcas_activas');
const { getMarcas } = require('./get_marcas');
const { getMarcaXGlosa } = require('./get_marca_glosa');
const { insMarca } = require('./ins_marca');
const { updEstadoMarca } = require('./upd_estado_marca');
const { updMarca } = require('./upd_marca');
const { updPhotoMarca } = require('./upd_photo_marca');

const marcas = {
  getMarca,
  getMarcasActivas,
  getMarcas,
  getMarcaXGlosa,
  insMarca,
  updEstadoMarca,
  updMarca,
  updPhotoMarca,
};

export default marcas;
