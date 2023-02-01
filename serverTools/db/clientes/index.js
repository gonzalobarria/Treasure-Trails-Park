const { getCliente } = require('./get_cliente');
const { getClienteEmailRut } = require('./get_cliente_email_rut');
const { getClienteRut } = require('./get_cliente_rut');
const { getClientesNegocio } = require('./get_clientes_negocio');
const { getClientes } = require('./get_clientes');
const { getOrdenesVenta } = require('./get_ordenes_venta');
const {
  getProductosAlmacenVentaCliente,
} = require('./get_productos_almacen_venta_cliente');
const { getProductosCliente } = require('./get_productos_cliente');
const { insCliente } = require('./ins_cliente');
const { updCliente } = require('./upd_cliente');
const { updEstadoCliente } = require('./upd_estado_cliente');
const { isClienteNegocio } = require('./is_cliente_negocio');
const { updPhotoCliente } = require('./upd_photo_cliente');

const clientes = {
  getCliente,
  getClienteEmailRut,
  getClienteRut,
  getClientesNegocio,
  getClientes,
  getOrdenesVenta,
  getProductosAlmacenVentaCliente,
  getProductosCliente,
  insCliente,
  updCliente,
  updEstadoCliente,
  isClienteNegocio,
  updPhotoCliente,
};

export default clientes;
