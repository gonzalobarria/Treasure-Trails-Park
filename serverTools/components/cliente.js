import { TIMEZONE } from 'lib/constants';
import momentTz from 'moment-timezone';
import db from '../db';
import clientes from '../db/clientes';
import {
  getID,
  checkParametros,
  encodeId,
  preQueryData,
  postDataPaginada,
} from '../utils/utiles';

export const insCliente = async (req) => {
  const { user, body } = req;

  const {
    rut,
    dv,
    razonSocial,
    nombre,
    apPaterno,
    apMaterno,
    email,
    datosAdicionales,
  } = body;

  try {
    checkParametros({
      rut,
      dv,
      razonSocial,
      nombre,
      apPaterno,
      apMaterno,
      email,
      datosAdicionales,
    });

    const cliente = await db.query(clientes.insCliente(), [
      rut,
      dv,
      razonSocial,
      nombre,
      apPaterno,
      apMaterno,
      email,
      datosAdicionales,
      user.idNegocioActivo,
    ]);

    return cliente.rows[0];
  } catch (error) {
    throw error;
  }
};

export const insProductoCliente = async (req) => {
  const { precioVenta } = req.body;
  const idCliente = getID(req.query.idCliente);
  const idNegocio = req.user.idNegocioActivo;
  const idProducto = getID(req.body.idProducto);

  try {
    await checkClienteNegocio(idCliente, idNegocio);

    checkParametros({ idProducto, precioVenta });

    const { rows } = await db.query(clientes.insProductoCliente(), [
      idCliente,
      idNegocio,
      idProducto,
      precioVenta,
    ]);

    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const getClientesNegocio = async (req) => {
  const { query, user } = req;

  try {
    const preData = preQueryData(query);

    const { rows } = await db.query(
      clientes.getClientesNegocio(preData.orderBy, preData.search),
      [preData.pageSize, preData.offset, user.idNegocioActivo, preData.search]
    );

    rows.forEach((item) => {
      item.id = encodeId(item.id_cliente);
      delete item['id_cliente'];
    });

    return postDataPaginada(preData, rows);
  } catch (error) {
    throw error;
  }
};

export const getClientes = async () => {
  try {
    const { rows } = await db.query(clientes.getClientes(), []);

    rows.forEach((cliente) => {
      cliente.id_cliente = encodeId(cliente.id_cliente);
    });

    return { rows };
  } catch (error) {
    throw error;
  }
};

const checkClienteNegocio = async (idCliente, idNegocio) => {
  try {
    const data = await db.query(clientes.isClienteNegocio(), [
      idCliente,
      idNegocio,
    ]);

    if (data.rowCount === 0) {
      throw new Error(`Cliente no pertenece al Negocio`);
    }
  } catch (error) {
    throw error;
  }
};

export const getClienteNegocio = async (req) => {
  const idCliente = getID(req.query.idCliente);
  const idNegocio = req.user.idNegocioActivo;

  try {
    await checkClienteNegocio(idCliente, idNegocio);

    const { rows } = await db.query(clientes.getCliente(), [idCliente]);

    rows.forEach((cliente) => {
      cliente.id_cliente = encodeId(cliente.id_cliente);
    });

    return { rows };
  } catch (error) {
    throw error;
  }
};

export const updEstadoCliente = async (req) => {
  const { activo } = req.body;
  const idCliente = getID(req.query.idCliente);
  const idNegocio = req.user.idNegocioActivo;

  try {
    await checkClienteNegocio(idCliente, idNegocio);

    checkParametros({ activo });

    const { rowCount } = await db.query(clientes.updEstadoCliente(), [
      idCliente,
      activo,
    ]);

    return { rowCount };
  } catch (error) {
    throw error;
  }
};

export const updCliente = async (req) => {
  const {
    rut,
    dv,
    razonSocial,
    nombre,
    apPaterno,
    apMaterno,
    email,
    datosAdicionales,
    activo,
  } = req.body;

  const idCliente = getID(req.query.idCliente);
  const idNegocio = req.user.idNegocioActivo;

  try {
    await checkClienteNegocio(idCliente, idNegocio);

    checkParametros({
      rut,
      dv,
      razonSocial,
      nombre,
      apPaterno,
      apMaterno,
      email,
      datosAdicionales,
      activo,
    });

    const cliente = await db.query(clientes.updCliente(), [
      idCliente,
      razonSocial,
      nombre,
      apPaterno,
      apMaterno,
      email,
      datosAdicionales,
      activo,
      rut,
      dv,
    ]);

    return cliente;
  } catch (error) {
    throw error;
  }
};

export const updPhotoCliente = async (req) => {
  const idCliente = getID(req.body.idCliente);
  try {
    let urlPhoto;
    if (req.files && req.files.length > 0 && req.files[0].cloudStoragePublicUrl)
      urlPhoto = req.files[0].cloudStoragePublicUrl;

    const { rows } = await db.query(clientes.getCliente(), [idCliente]);

    let datosAdicionales = rows[0].datos_adicionales || {};
    datosAdicionales.imgURL = urlPhoto;

    const cliente = await db.query(clientes.updPhotoCliente(), [
      idCliente,
      datosAdicionales,
    ]);

    return cliente;
  } catch (error) {
    throw error;
  }
};

export const checkCliente = async (req) => {
  const {
    body: { rut },
    user,
  } = req;

  try {
    checkParametros({ rut });

    return await db.query(clientes.getClienteRut(), [
      user.idNegocioActivo,
      rut,
    ]);
  } catch (error) {
    throw error;
  }
};

const getProductosCliente = async (req) => {
  const { query, user } = req;

  try {
    const { rows } = await db.query(clientes.getProductosCliente(), [
      getID(query.idCliente),
      user.idNegocioActivo,
    ]);

    rows.forEach((item) => {
      item.id = encodeId(item.id_producto);
      item.id_almacen = encodeId(item.id_almacen);
      delete item.id_producto;
    });

    return rows;
  } catch (error) {
    throw error;
  }
};

export const getProductosAlmacenVentaCliente = async (req) => {
  const { query } = req;

  const idAlmacen = query?.idAlmacenActivo ?? query?.idAlmacen;

  try {
    const preData = preQueryData(query);

    const category = getID(query?.category) ?? -1;

    const { rows } = await db.query(
      clientes.getProductosAlmacenVentaCliente(
        preData.orderBy,
        category,
        preData.search
      ),
      [
        preData.pageSize,
        preData.offset,
        getID(idAlmacen),
        category,
        preData.search,
        getID(query.idCliente),
      ]
    );

    rows.forEach((item) => {
      item.id = encodeId(item.id_producto);
      item.idAlmacen = idAlmacen;
      delete item.id_producto;
    });

    return postDataPaginada(preData, rows);
  } catch (error) {
    throw error;
  }
};

const getOrdenesVenta = async (req) => {
  const { query, user } = req;

  try {
    const preData = preQueryData(query);

    const { rows } = await db.query(clientes.getOrdenesVenta(preData.orderBy), [
      preData.pageSize,
      preData.offset,
      user.idNegocioActivo,
      getID(query.idCliente),
    ]);

    rows.forEach((item) => {
      item.id = encodeId(item.id_orden_venta);
      item.id_negocio = encodeId(item.id_negocio);
      item.id_usuario_cajero = encodeId(item.id_usuario_cajero);
      item.id_cliente = encodeId(item.id_cliente);
      item.id_estado = encodeId(item.id_estado);
      item.fecha_creacion = momentTz
        .tz(item.fecha_creacion, TIMEZONE)
        .format('DD/MM/YYYY HH:mm');
    });

    return postDataPaginada(preData, rows);
  } catch (error) {
    throw error;
  }
};

const clienteComponent = {
  checkCliente,
  getClienteNegocio,
  getClientes,
  getClientesNegocio,
  getOrdenesVenta,
  getProductosAlmacenVentaCliente,
  getProductosCliente,
  insCliente,
  insProductoCliente,
  updCliente,
  updEstadoCliente,
  updPhotoCliente,
};

export default clienteComponent;
