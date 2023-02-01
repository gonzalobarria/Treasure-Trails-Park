const { getProveedor } = require('./get_proveedor');
const { getProveedorXGlosa } = require('./get_proveedor_glosa');
const { getProveedoresActivos } = require('./get_proveedores_activos');
const { getProveedores } = require('./get_proveedores');
const { insProveedor } = require('./ins_proveedor');
const { updEstadoProveedor } = require('./upd_estado_proveedor');
const { updProveedor } = require('./upd_proveedor');
const { updPhotoProveedor } = require('./upd_photo_proveedor');

const proveedores = {
  getProveedor,
  getProveedorXGlosa,
  getProveedoresActivos,
  getProveedores,
  insProveedor,
  updEstadoProveedor,
  updProveedor,
  updPhotoProveedor,
};

export default proveedores;
