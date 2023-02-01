const { buscaOrdenes } = require('./busca_ordenes');
const { getOrden } = require('./get_orden');
const { getOrdenesActivos } = require('./get_odenes_activas');
const { getOrdenes } = require('./get_ordenes');
const { getOrdenesAlmacen } = require('./get_ordenes_almacen');
const { getOrdenesMarca } = require('./get_ordenes_marca');
const { getOrdenesProducto } = require('./get_ordenes_producto');
const { getOrdenesProveedor } = require('./get_ordenes_proveedor');
const { insOrden } = require('./ins_orden');
const { insProductoOrden } = require('./ins_producto_orden');
const { updEstadoOrden } = require('./upd_estado_orden');
const { updOrden } = require('./upd_orden');
const { updOrdenUsuarioReceptor } = require('./upd_orden_usuario_receptor');
const { updPhotoOrden } = require('./upd_photo_orden');
const { updPhotoProductoOrden } = require('./upd_photo_producto_orden');
const { getOrdenSimple } = require('./get_orden_simple');

const ordenes = {
  buscaOrdenes,
  getOrden,
  getOrdenesActivos,
  getOrdenes,
  getOrdenesAlmacen,
  getOrdenesMarca,
  getOrdenesProducto,
  getOrdenesProveedor,
  updEstadoOrden,
  updOrden,
  updOrdenUsuarioReceptor,
  insOrden,
  insProductoOrden,
  updPhotoOrden,
  updPhotoProductoOrden,
  getOrdenSimple,
};

export default ordenes;
