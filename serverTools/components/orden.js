import momentTz from 'moment-timezone';
import db from '../db';
import ordenes from '../db/ordenes';
import { ESTADOS_ORDEN, FUNCIONALIDADES } from '../utils/enums';
import { format } from 'date-fns';
import {
  checkParametros,
  encodeId,
  getID,
  postDataPaginada,
  preQueryData,
} from '../utils/utiles';
import productosDB from '../db/productos';
import { TIMEZONE } from 'lib/constants';

export const buscaOrden = async (body) => {
  const { textSearch } = body;

  try {
    checkParametros({ textSearch });

    const { rows } = await db.query(ordenes.buscaOrden(), [textSearch]);

    rows.forEach((orden) => {
      orden.id_orden = encodeId(orden.id_orden);
    });

    return { rows };
  } catch (error) {
    throw error;
  }
};

export const insOrden = async (req) => {
  const { user, body } = req;

  const client = await db.pool.connect();
  const idUsuarioEmisor = user.id;

  let { productos, preOrder } = body;

  try {
    checkParametros({ productos });
    const idNegocio = user.idNegocioActivo;

    if (productos?.length == 0) throw new Error('error.orden-sin-productos');

    let idOrigen;
    let idDestino;
    let esInterno = false;

    productos.forEach((producto) => {
      if (producto.origen === 1) {
        idOrigen = getID(producto.idProveedor);
      }
      if (producto.origen === 2) {
        esInterno = true;
        idOrigen = getID(producto.idAlmacenOrigen);
      }
      idDestino = getID(producto.idAlmacenDestino);
    });

    const idUsuarioReceptor = idUsuarioEmisor;
    let productosAlmacen = [];

    if (esInterno) {
      productosAlmacen = await db.query(productosDB.getProductosAlmacen(), [
        idOrigen,
      ]);

      productos.forEach((producto) => {
        const prodBD = productosAlmacen.rows.find((prod) => {
          if (
            prod.id_producto === getID(producto.idProducto) &&
            prod.stock_disponible >= producto.cantidad
          ) {
            return prod;
          }
        });
        if (!prodBD) {
          throw new Error('error.producto-sin-stock-suficiente');
        }
      });
    }

    await client.query('BEGIN');

    const orden = await client.query(ordenes.insOrden(), [
      idNegocio,
      idUsuarioEmisor,
      idUsuarioReceptor,
      idOrigen,
      idDestino,
      {},
      esInterno,
      preOrder ? ESTADOS_ORDEN.PREORDER_GENERADA : ESTADOS_ORDEN.EN_PROCESO,
    ]);

    productos.forEach(async (producto) => {
      await client.query(ordenes.insProductoOrden(), [
        orden.rows[0].id_orden,
        getID(producto.idProducto),
        producto.cantidad,
        producto.idUnidadMedida,
      ]);

      if (esInterno) {
        const prodTMP = productosAlmacen.rows.find(
          (prod) => prod.id_producto === getID(producto.idProducto)
        );
        const nuevaCantidad = prodTMP.stock_disponible - producto.cantidad;

        const datosAdicionales = prodTMP.datos_adicionales || {};
        const ordenes = datosAdicionales.ordenes || [];

        ordenes.push({
          idOrden: orden.rows[0].id_orden,
          stockRetenido: producto.cantidad,
        });

        datosAdicionales.ordenes = ordenes;

        await client.query(productosDB.updProductoAlmacen(), [
          idOrigen,
          getID(producto.idProducto),
          user.idNegocioActivo,
          nuevaCantidad,
          datosAdicionales,
        ]);
      }
    });

    await client.query('COMMIT');

    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const getOrdenes = async (req) => {
  const { query, user } = req;
  const idNegocio = user.idNegocioActivo;

  try {
    const pageSizeDefault = 8;
    const orderByDefault = 1;
    const currentPageDefault = 1;
    const currentPage =
      query && query.currentPage !== undefined
        ? query.currentPage
        : currentPageDefault;

    const pageSize =
      query && query.pageSize !== undefined && !isNaN(query.pageSize)
        ? query.pageSize
        : pageSizeDefault;

    const orderBy =
      query && query.orderBy !== undefined && !isNaN(query.orderBy)
        ? query.orderBy
        : orderByDefault;

    const offset = pageSize * (currentPage - 1);

    let misOrdenes;

    if (query && query.search === undefined) {
      misOrdenes = await db.query(ordenes.getOrdenes(orderBy), [
        pageSize,
        offset,
        idNegocio,
      ]);
    } else {
      misOrdenes = await db.query(ordenes.buscaOrdenes(), [
        query.search,
        idNegocio,
      ]);
    }

    let rows = misOrdenes.rows;

    const datosNegocioActivo = user.negociosUsuario.find(
      (negocio) => user.idNegocioActivo === negocio.id_negocio
    );

    const verOrden = datosNegocioActivo.func.find(
      (f) => f === FUNCIONALIDADES.Ver_Orden
    );

    if (verOrden)
      rows = rows.filter(
        (orden) =>
          orden.id_usuario_receptor === user.id ||
          orden.id_usuario_emisor === user.id
      );

    rows.forEach((orden) => {
      orden.id = encodeId(orden.id_orden);
      orden.id_negocio = encodeId(orden.id_negocio);
      delete orden['id_orden'];
      delete orden['id_usuario_receptor'];
      delete orden['id_usuario_emisor'];
    });

    const total = rows.length > 0 ? rows[0].total : 0;

    const salida = {
      currentPage: currentPage,
      pageSize: pageSize,
      status: true,
      totalItem: total,
      totalPage: Math.ceil(total / pageSize),
      data: rows,
    };

    return salida;
  } catch (error) {
    throw error;
  }
};

export const getOrdenActivos = async () => {
  try {
    const { rows } = await db.query(ordenes.getOrdenActivos(), []);

    rows.forEach((orden) => {
      orden.id_orden = encodeId(orden.id_orden);
    });

    return { rows };
  } catch (error) {
    throw error;
  }
};

export const getOrden = async (req) => {
  const { query, body, user } = req;
  const idOrden = query.idOrden ? query.idOrden : body.idOrden;

  try {
    const { rows } = await db.query(ordenes.getOrden(), [
      getID(idOrden),
      user.idNegocioActivo,
    ]);

    rows.forEach((orden) => {
      orden.id_orden = encodeId(orden.id_orden);
      orden.id_negocio = encodeId(orden.id_negocio);
      orden.id_origen = encodeId(orden.id_origen);
      orden.id_destino = encodeId(orden.id_destino);
      let fechaCreacion = new Date(orden.fecha_creacion);
      orden.fecha_creacion = format(fechaCreacion, 'dd.MM.yyyy');
    });

    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const updEstadoOrden = async (req) => {
  const { query, body, user } = req;
  const { action } = body;
  let idEstado = 0;
  const client = await db.pool.connect();

  try {
    checkParametros({ action });
    await client.query('BEGIN');

    if (action === 'cerrarPedido') {
      const orden = await db.query(ordenes.getOrden(), [
        getID(query.idOrden),
        user.idNegocioActivo,
      ]);

      const idAlmacenDestino = orden.rows[0].id_destino;
      const idAlmacenOrigen = orden.rows[0].id_origen;

      const productos = await db.query(productosDB.getProductosOrden(), [
        getID(query.idOrden),
      ]);

      productos.rows.forEach(async (producto) => {
        let cantidad =
          producto.datos_adicionales?.cantidadRecibida ?? producto.cantidad;

        cantidad =
          producto.id_unidad_medida !== 1
            ? (cantidad * producto.unidades_embalaje) / producto.unidades_venta
            : cantidad;

        const prodAlmacenOrigen = await db.query(
          productosDB.getProductoAlmacen(),
          [idAlmacenOrigen, producto.id_producto]
        );
        const prodAlmacenDestino = await db.query(
          productosDB.getProductoAlmacen(),
          [idAlmacenDestino, producto.id_producto]
        );

        if (prodAlmacenDestino.rows.length > 0) {
          try {
            await client.query(productosDB.updProductoAlmacen(), [
              idAlmacenDestino,
              producto.id_producto,
              user.idNegocioActivo,
              cantidad + prodAlmacenDestino.rows[0].stock_disponible,
              prodAlmacenDestino.rows[0].datos_adicionales,
            ]);
          } catch (error) {
            console.log(error);
          }
        } else {
          await client.query(productosDB.insProductoAlmacen(), [
            idAlmacenDestino,
            producto.id_producto,
            cantidad,
          ]);
        }
        if (orden.rows[0].es_interno) {
          const datosAdic = prodAlmacenOrigen.rows[0].datos_adicionales;

          if (datosAdic && datosAdic.ordenes) {
            const ordenes = datosAdic.ordenes.filter(
              (orden) => orden.idOrden !== getID(query.idOrden)
            );
            prodAlmacenOrigen.rows[0].datos_adicionales.ordenes = ordenes;
          }

          // elimino los datos de la orden porque ya se movieron
          await client.query(productosDB.updProductoAlmacen(), [
            idAlmacenOrigen,
            producto.id_producto,
            user.idNegocioActivo,
            prodAlmacenOrigen.rows[0].stock_disponible,
            prodAlmacenOrigen.rows[0].datos_adicionales,
          ]);
        }
      });

      idEstado = ESTADOS_ORDEN.RECIBIDO;
    }
    const { rowCount } = await client.query(ordenes.updEstadoOrden(), [
      getID(query.idOrden),
      user.idNegocioActivo,
      idEstado,
    ]);

    await client.query('COMMIT');

    return rowCount;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const updOrden = async (idOrden, body) => {
  const { glosa, descripcion, datosAdicionales, activo, idMarca } = body;

  try {
    checkParametros({
      glosa,
      descripcion,
      datosAdicionales,
      activo,
      idMarca,
    });

    const { rowCount } = await db.query(ordenes.updOrden(), [
      idOrden,
      glosa,
      descripcion,
      datosAdicionales,
      activo,
      idMarca,
    ]);

    return { rowCount };
  } catch (error) {
    throw error;
  }
};

export const getOrdenesProducto = async (req) => {
  const { query, user } = req;

  try {
    const preData = preQueryData(query);

    const { rows } = await db.query(ordenes.getOrdenesProducto(), [
      preData.pageSize,
      preData.offset,
      user.idNegocioActivo,
      getID(query.idProducto),
    ]);

    rows.forEach((orden) => {
      orden.id = encodeId(orden.id_orden);
      orden.id_negocio = encodeId(orden.id_negocio);
      orden.fecha_creacion = momentTz
        .tz(orden.fecha_creacion, TIMEZONE)
        .format('DD.MM.YYYY');

      delete orden.id_orden;
    });

    return postDataPaginada(preData, rows);
  } catch (error) {
    throw error;
  }
};

export const getOrdenesAlmacen = async (req) => {
  const { query, user } = req;
  const idNegocio = user.idNegocioActivo;
  const idAlmacen = getID(query.idAlmacen);

  try {
    const pageSizeDefault = 8;
    const currentPageDefault = 1;
    const currentPage =
      query && query.currentPage !== undefined
        ? Number(query.currentPage)
        : currentPageDefault;

    const pageSize =
      query && query.pageSize !== undefined && !isNaN(query.pageSize)
        ? Number(query.pageSize)
        : pageSizeDefault;

    const offset = pageSize * (currentPage - 1);

    const { rows } = await db.query(ordenes.getOrdenesAlmacen(), [
      pageSize,
      offset,
      idNegocio,
      idAlmacen,
    ]);

    rows.forEach((orden) => {
      orden.id = encodeId(orden.id_orden);
      delete orden['id_orden'];

      let fechaCreacion = new Date(orden.fecha_creacion);
      orden.fecha_creacion = format(fechaCreacion, 'dd.MM.yyyy');
    });

    const total = rows.length > 0 ? rows[0].total : 0;

    const salida = {
      currentPage: currentPage,
      pageSize: pageSize,
      status: true,
      totalItem: total,
      totalPage: Math.ceil(total / pageSize),
      data: rows,
    };

    return salida;
  } catch (error) {
    throw error;
  }
};

export const getOrdenesProveedor = async (req) => {
  const { query, user } = req;
  const idNegocio = user.idNegocioActivo;
  const idProveedor = getID(query.idProveedor);

  try {
    const pageSizeDefault = 8;
    const currentPageDefault = 1;
    const currentPage =
      query && query.currentPage !== undefined
        ? Number(query.currentPage)
        : currentPageDefault;

    const pageSize =
      query && query.pageSize !== undefined && !isNaN(query.pageSize)
        ? Number(query.pageSize)
        : pageSizeDefault;

    const offset = pageSize * (currentPage - 1);

    const { rows } = await db.query(ordenes.getOrdenesProveedor(), [
      pageSize,
      offset,
      idNegocio,
      idProveedor,
    ]);

    rows.forEach((orden) => {
      orden.id = encodeId(orden.id_orden);
      delete orden['id_orden'];

      let fechaCreacion = new Date(orden.fecha_creacion);
      orden.fecha_creacion = format(fechaCreacion, 'dd.MM.yyyy');
    });

    const total = rows.length > 0 ? rows[0].total : 0;

    const salida = {
      currentPage: currentPage,
      pageSize: pageSize,
      status: true,
      totalItem: total,
      totalPage: Math.ceil(total / pageSize),
      data: rows,
    };

    return salida;
  } catch (error) {
    throw error;
  }
};

export const getOrdenesMarca = async (req) => {
  const { query, user } = req;
  const idNegocio = user.idNegocioActivo;
  const idMarca = getID(query.idMarca);

  try {
    const pageSizeDefault = 8;
    const currentPageDefault = 1;
    const currentPage =
      query && query.currentPage !== undefined
        ? Number(query.currentPage)
        : currentPageDefault;

    const pageSize =
      query && query.pageSize !== undefined && !isNaN(query.pageSize)
        ? Number(query.pageSize)
        : pageSizeDefault;

    const offset = pageSize * (currentPage - 1);

    const { rows } = await db.query(ordenes.getOrdenesMarca(), [
      pageSize,
      offset,
      idNegocio,
      idMarca,
    ]);

    rows.forEach((orden) => {
      orden.id = encodeId(orden.id_orden);
      delete orden['id_orden'];

      let fechaCreacion = new Date(orden.fecha_creacion);
      orden.fecha_creacion = format(fechaCreacion, 'dd.MM.yyyy');
    });

    const total = rows.length > 0 ? rows[0].total : 0;

    const salida = {
      currentPage: currentPage,
      pageSize: pageSize,
      status: true,
      totalItem: total,
      totalPage: Math.ceil(total / pageSize),
      data: rows,
    };

    return salida;
  } catch (error) {
    throw error;
  }
};

export const updPhotoOrden = async (req) => {
  const {
    body: { idOrden },
    user,
  } = req;

  try {
    let urlPhoto;
    if (req.files && req.files.length > 0 && req.files[0].cloudStoragePublicUrl)
      urlPhoto = req.files[0].cloudStoragePublicUrl;

    const { rows } = await db.query(ordenes.getOrden(), [
      getID(idOrden),
      user.idNegocioActivo,
    ]);

    let datosAdicionales = rows[0].datos_adicionales || {};
    datosAdicionales.imgURL = urlPhoto;

    return await db.query(ordenes.updPhotoOrden(), [
      getID(idOrden),
      datosAdicionales,
    ]);
  } catch (error) {
    throw error;
  }
};

export const updOrdenUsuarioReceptor = async (req) => {
  const { idOrden, idUsuario } = req.body;

  try {
    checkParametros({ idOrden, idUsuario });

    return await db.query(ordenes.updOrdenUsuarioReceptor(), [
      getID(idOrden),
      req.user.idNegocioActivo,
      getID(idUsuario),
    ]);
  } catch (error) {
    throw error;
  }
};

export const updPhotoProductoOrden = async (req) => {
  const { body, files } = req;
  const { idProducto, idOrden } = body;

  try {
    let urlPhoto;
    if (files && files.length > 0 && files[0].cloudStoragePublicUrl)
      urlPhoto = files[0].cloudStoragePublicUrl;

    const { rows } = await db.query(productosDB.getProductoOrden(), [
      getID(idOrden),
      getID(idProducto),
    ]);

    let datosAdicionales = rows[0].datos_adicionales || {};
    datosAdicionales.imgURL = urlPhoto;

    return await db.query(ordenes.updPhotoProductoOrden(), [
      getID(idOrden),
      getID(idProducto),
      datosAdicionales,
    ]);
  } catch (error) {
    throw error;
  }
};

const ordenComponent = {
  buscaOrden,
  insOrden,
  getOrdenes,
  getOrdenActivos,
  getOrden,
  updEstadoOrden,
  updOrden,
  getOrdenesProducto,
  getOrdenesAlmacen,
  getOrdenesProveedor,
  getOrdenesMarca,
  updPhotoOrden,
  updOrdenUsuarioReceptor,
  updPhotoProductoOrden,
};

export default ordenComponent;
