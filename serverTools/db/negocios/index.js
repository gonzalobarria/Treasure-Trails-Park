const { getNegocio } = require('./get_negocio');
const { getNegociosActivos } = require('./get_negocios_activos');
const { getNegocios } = require('./get_negocios');
const { insNegocio } = require('./ins_negocio');
const { updEstadoNegocio } = require('./upd_estado_negocio');
const { updNegocio } = require('./upd_negocio');

const negocios = {
  getNegocio,
  getNegociosActivos,
  getNegocios,
  insNegocio,
  updEstadoNegocio,
  updNegocio,
};

export default negocios;
