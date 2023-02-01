const { buscaOrdenesVenta } = require('./busca_ordenes_venta');
const { getOrdenVenta } = require('./get_orden_venta');
const { getOrdenesActivos } = require('./get_odenes_activas');
const { getOrdenesVenta } = require('./get_ordenes_venta');
const { getOrdenesVentaAlmacen } = require('./get_ordenes_venta_almacen');
const { getOrdenesVentaMarca } = require('./get_ordenes_venta_marca');
const { getOrdenesProveedor } = require('./get_ordenes_proveedor');
const { insOrdenVenta } = require('./ins_orden_venta');
const {
  insProductoAlmacenOrdenVenta,
} = require('./ins_producto_almacen_orden_venta');
const { updOrden } = require('./upd_orden');
const { updOrdenVentaCliente } = require('./upd_orden_venta_cliente');
const { updPhotoOrden } = require('./upd_photo_orden');
const { getOrdenVentaSimple } = require('./get_orden_venta_simple');
const { getOrdenesVentaSemana } = require('./get_ordenes_venta_por_dia');
const {
  getOrdenesVentaSemanaMonto,
} = require('./get_ordenes_venta_por_dia_monto');

const ordenesVenta = {
  buscaOrdenesVenta,
  getOrdenVenta,
  // getOrdenesActivos,
  getOrdenesVenta,
  getOrdenesVentaAlmacen,
  getOrdenesVentaMarca,
  // getOrdenesProveedor,
  // updOrden,
  updOrdenVentaCliente,
  insOrdenVenta,
  insProductoAlmacenOrdenVenta,
  // updPhotoOrden,
  getOrdenVentaSimple,
  getOrdenesVentaSemana,
  getOrdenesVentaSemanaMonto,
};

export default ordenesVenta;
