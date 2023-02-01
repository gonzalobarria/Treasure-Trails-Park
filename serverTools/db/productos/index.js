const { delProductoAlmacen } = require('./del_producto_almacen');
const { delProductoCliente } = require('./del_producto_cliente');
const { delProductoOrden } = require('./del_producto_orden');

const { getProducto } = require('./get_producto');
const { getProductoAlmacen } = require('./get_producto_almacen');
const { getProductoOrden } = require('./get_producto_orden');
const { getProductoXGlosa } = require('./get_producto_glosa');

const { getProductos } = require('./get_productos');
const { getProductosActivosOrden } = require('./get_productos_activos_orden');
const { getProductosAlmacen } = require('./get_productos_almacen');
const { getProductosAlmacenes } = require('./get_productos_almacenes');
const {
  getProductosAlmacenNoEstanOrden,
} = require('./get_productos_almacen_no_esta_orden');
const { getProductosAlmacenVenta } = require('./get_productos_almacen_venta');
const { getProductosBajoStock } = require('./get_productos_bajo_stock');
const { getProductosCategoria } = require('./get_productos_categoria');
const {
  getProductosClienteNegocio,
} = require('./get_productos_cliente_negocio');
const {
  getProductosClienteNegocioLibres,
} = require('./get_productos_cliente_negocio_libres');
const { getProductosMarca } = require('./get_productos_marca');
const { getProductosMejorVendidos } = require('./get_productos_mejor_vendidos');
const {
  getProductosNoEstanAlmacen,
} = require('./get_productos_no_esta_almacen');
const { getProductosOrdenVenta } = require('./get_productos_orden_venta');
const { getProductosOrden } = require('./get_productos_orden');
const { getProductosProveedor } = require('./get_productos_proveedor');
const {
  getProductosProveedorNoEstanOrden,
} = require('./get_productos_proveedor_no_esta_orden');
const { getProductosTodos } = require('./get_productos_todos');
const { getProductosVoucher } = require('./get_productos_voucher');

const { insProducto } = require('./ins_producto');
const { insProductoAlmacen } = require('./ins_producto_almacen');
const { insProductoCliente } = require('./ins_producto_cliente');
const { insProductoOrden } = require('./ins_producto_orden');

const { updEstadoProducto } = require('./upd_estado_producto');
const { updPhotoProducto } = require('./upd_photo_producto');
const { updProducto } = require('./upd_producto');
const { updProductoAlmacen } = require('./upd_producto_almacen');
const { updProductoAlmacenVenta } = require('./upd_producto_almacen_venta');
const { updProductoCliente } = require('./upd_producto_cliente');
const { updProductoOrden } = require('./upd_producto_orden');

const productos = {
  delProductoAlmacen,
  delProductoCliente,
  delProductoOrden,

  getProducto,
  getProductoAlmacen,
  getProductoOrden,
  getProductoXGlosa,

  getProductos,
  getProductosActivosOrden,
  getProductosAlmacen,
  getProductosAlmacenes,
  getProductosAlmacenNoEstanOrden,
  getProductosAlmacenVenta,
  getProductosBajoStock,
  getProductosCategoria,
  getProductosClienteNegocio,
  getProductosClienteNegocioLibres,
  getProductosMarca,
  getProductosMejorVendidos,
  getProductosNoEstanAlmacen,
  getProductosOrden,
  getProductosOrdenVenta,
  getProductosProveedor,
  getProductosProveedorNoEstanOrden,
  getProductosTodos,
  getProductosVoucher,

  insProducto,
  insProductoAlmacen,
  insProductoCliente,
  insProductoOrden,

  updEstadoProducto,
  updPhotoProducto,
  updProducto,
  updProductoAlmacen,
  updProductoAlmacenVenta,
  updProductoCliente,
  updProductoOrden,
};

export default productos;
