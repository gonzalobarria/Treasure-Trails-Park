import { TIMEZONE } from 'lib/constants';
import momentTz from 'moment-timezone';
import {
  ALERTA_STOCK,
  ESTADOS_ALMACEN,
  ESTADOS_BOOLEAN,
  TIPOS_VENTA,
} from 'serverTools/utils/enums';
import db from '../db';
import almacenes from '../db/almacenes';
import ordenesDB from '../db/ordenes';
import productosDB from '../db/productos';
import {
  encodeId,
  checkParametros,
  getID,
  limpiaString,
  preQueryData,
  postDataPaginada,
  preparaNumero,
} from '../utils/utiles';

export const insProductoCliente = async (req) => {
  let { idCliente, idProducto, precioVenta } = req.body;

  try {
    checkParametros({ idCliente, idProducto, precioVenta });
    idProducto = getID(idProducto);
    idCliente = getID(idCliente);

    const { rows } = await db.query(productosDB.insProductoCliente(), [
      idCliente,
      idProducto,
      precioVenta,
    ]);

    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const insProducto = async (req) => {
  const { body, user } = req;

  const {
    idMarca,
    idCategoria,
    glosa,
    descripcion,
    precioDetalle,
    precioMayor,
    precioEmbalaje,
    unidadesEmbalaje,
    unidadesVenta,
    barcode,
    sku,
  } = body;

  try {
    checkParametros({
      idMarca,
      idCategoria,
      glosa,
      descripcion,
      precioDetalle,
      precioMayor,
      precioEmbalaje,
      unidadesEmbalaje,
      unidadesVenta,
      barcode,
      sku,
    });

    const { rowCount } = await db.query(productosDB.insProducto(), [
      user.idNegocioActivo,
      getID(idMarca),
      getID(idCategoria),
      limpiaString(glosa),
      limpiaString(descripcion),
      preparaNumero(precioDetalle),
      preparaNumero(precioMayor),
      preparaNumero(precioEmbalaje),
      preparaNumero(unidadesEmbalaje),
      preparaNumero(unidadesVenta),
      limpiaString(barcode),
      limpiaString(sku),
    ]);

    return rowCount;
  } catch (error) {
    throw error;
  }
};

export const getProductosActivosOrden = async (req) => {
  const { user } = req;

  try {
    const { rows } = await db.query(productosDB.getProductosActivosOrden(), [
      user.idNegocioActivo,
    ]);

    return rows.map((item) => {
      const tmp = { id: encodeId(item.id_producto), ...item };
      const { id_producto, ...salida } = tmp;
      return salida;
    });
  } catch (error) {
    throw error;
  }
};

export const getProducto = async (req) => {
  const {
    query: { idProducto },
  } = req;

  try {
    const { rows } = await db.query(productosDB.getProducto(), [
      getID(idProducto),
    ]);

    if (rows?.length === 0) throw new Error(`Producto no Encontrado`);

    return rows
      .map((item) => {
        const tmp = {
          id: encodeId(item.id_producto),
          ...item,
          id_negocio: encodeId(item.id_negocio),
          id_marca: encodeId(item.id_marca),
          id_categoria: encodeId(item.id_categoria),
        };
        const { id_producto, ...salida } = tmp;
        return salida;
      })
      .find((i) => i.id === idProducto);
  } catch (error) {
    throw error;
  }
};

export const updEstadoProducto = async (idProducto, body) => {
  const { activo } = body;

  try {
    checkParametros({ activo });

    const { rowCount } = await db.query(productosDB.updEstadoProducto(), [
      idProducto,
      activo,
    ]);

    return { rowCount };
  } catch (error) {
    throw error;
  }
};

export const updProducto = async (req) => {
  const {
    body: {
      idMarca,
      idCategoria,
      glosa,
      descripcion,
      precioDetalle,
      precioMayor,
      precioEmbalaje,
      unidadesEmbalaje,
      unidadesVenta,
      barcode,
      sku,
      activo,
    },
    query,
  } = req;

  try {
    checkParametros({
      idMarca,
      idCategoria,
      glosa,
      descripcion,
      precioDetalle,
      precioMayor,
      precioEmbalaje,
      unidadesEmbalaje,
      unidadesVenta,
      barcode,
      sku,
      activo,
    });

    const { rowCount } = await db.query(productosDB.updProducto(), [
      getID(query.idProducto),
      getID(idMarca),
      getID(idCategoria),
      limpiaString(glosa),
      limpiaString(descripcion),
      preparaNumero(precioDetalle),
      preparaNumero(precioMayor),
      preparaNumero(precioEmbalaje),
      preparaNumero(unidadesEmbalaje),
      preparaNumero(unidadesVenta),
      limpiaString(barcode),
      limpiaString(sku),
      activo,
    ]);

    return rowCount;
  } catch (error) {
    throw error;
  }
};

export const getProductosAlmacen = async (req) => {
  const {
    query: { idAlmacen },
  } = req;

  try {
    const { rows } = await db.query(productosDB.getProductosAlmacen(), [
      getID(idAlmacen),
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

export const getProductosAlmacenVenta = async (req) => {
  const { query } = req;

  const idAlmacen = query?.idAlmacenActivo ?? query?.idAlmacen;

  try {
    const preData = preQueryData(query);

    const category = getID(query?.category) ?? -1;

    const { rows } = await db.query(
      productosDB.getProductosAlmacenVenta(
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

export const getProductosClienteNegocio = async (req) => {
  const { user, query, body } = req;

  const idCliente = query.idCliente ? query.idCliente : body.idCliente;

  try {
    const { rows } = await db.query(productosDB.getProductosClienteNegocio(), [
      user.idNegocioActivo,
      getID(idCliente),
    ]);

    rows.forEach((producto) => {
      producto.id = encodeId(producto.id_producto);
      producto.id_producto_cliente = encodeId(producto.id_producto_cliente);
      delete producto['id_producto'];
    });

    return rows;
  } catch (error) {
    throw error;
  }
};

export const getProductos = async (req) => {
  const { user, query } = req;

  try {
    const preData = preQueryData(query);

    const { rows } = await db.query(
      productosDB.getProductos(preData.orderBy, preData.search),
      [preData.pageSize, preData.offset, user.idNegocioActivo, preData.search]
    );

    rows.forEach((item) => {
      item.id = encodeId(item.id_producto);
      item.id_negocio = encodeId(item.id_negocio);
      item.id_marca = encodeId(item.id_marca);
      item.id_categoria = encodeId(item.id_categoria);

      delete item.id_producto;
    });

    return postDataPaginada(preData, rows);
  } catch (error) {
    throw error;
  }
};

export const getProductosProveedor = async (req) => {
  const { user } = req;

  try {
    const { rows } = await db.query(productosDB.getProductosProveedor(), [
      user.idNegocioActivo,
    ]);

    rows.forEach((item) => {
      item.id = encodeId(item.id_producto);
      item.id_marca = encodeId(item.id_marca);
      delete item.id_producto;
    });

    return rows;
  } catch (error) {
    throw error;
  }
};

export const delProductoCliente = async (req) => {
  try {
    const { idCliente } = req.query;
    const { idProducto } = req.body;

    const { rowCount } = await db.query(productosDB.delProductoCliente(), [
      getID(idCliente),
      getID(idProducto),
    ]);

    return { rowCount };
  } catch (error) {
    throw error;
  }
};

export const updProductoCliente = async (req) => {
  try {
    const { idCliente } = req.query;
    const { idProducto, precioVenta } = req.body;

    const { rowCount } = await db.query(productosDB.updProductoCliente(), [
      getID(idCliente),
      getID(idProducto),
      precioVenta,
    ]);

    return { rowCount };
  } catch (error) {
    throw error;
  }
};

export const getProductosClienteNegocioLibres = async (req) => {
  const { user, query } = req;

  try {
    const { rows } = await db.query(
      productosDB.getProductosClienteNegocioLibres(),
      [user.idNegocioActivo, getID(query.idCliente)]
    );

    rows.forEach((producto) => {
      producto.id = encodeId(producto.id_producto);
      delete producto['id_producto'];
    });

    return rows;
  } catch (error) {
    throw error;
  }
};

export const delProductoAlmacen = async (req) => {
  try {
    const {
      query: { idAlmacen },
      body: { idProducto },
      user,
    } = req;

    const { rowCount } = await db.query(productosDB.delProductoAlmacen(), [
      getID(idAlmacen),
      getID(idProducto),
      user.idNegocioActivo,
    ]);

    return { rowCount };
  } catch (error) {
    throw error;
  }
};

export const updProductoAlmacen = async (req) => {
  try {
    const {
      user,
      query: { idAlmacen },
      body: { idProducto, stockDisponible },
    } = req;

    const datosAdicionales = {};
    const { rowCount } = await db.query(productosDB.updProductoAlmacenVenta(), [
      getID(idAlmacen),
      getID(idProducto),
      user.idNegocioActivo,
      stockDisponible,
      datosAdicionales,
    ]);

    return { rowCount };
  } catch (error) {
    throw error;
  }
};

export const updPhotoProducto = async (req) => {
  const {
    body: { idProducto },
  } = req;

  try {
    let urlPhoto;
    if (req.files && req.files.length > 0 && req.files[0].cloudStoragePublicUrl)
      urlPhoto = req.files[0].cloudStoragePublicUrl;

    const { rows } = await db.query(productosDB.getProducto(), [
      getID(idProducto),
    ]);

    let datosAdicionales = rows[0].datos_adicionales || {};
    datosAdicionales.imgURL = urlPhoto;

    const cliente = await db.query(productosDB.updPhotoProducto(), [
      rows[0].id_producto,
      datosAdicionales,
    ]);

    return cliente;
  } catch (error) {
    throw error;
  }
};

export const checkProducto = async (req) => {
  let {
    body: { glosa },
  } = req;

  try {
    checkParametros({ glosa });

    const { rowCount } = await db.query(productosDB.getProductoXGlosa(), [
      limpiaString(glosa),
    ]);

    return rowCount;
  } catch (error) {
    throw error;
  }
};

export const checkProductoAlmacen = async (req) => {
  const {
    query: { idProducto: idP, idAlmacen: idA },
    body: { idAlmacen, idProducto },
  } = req;

  try {
    if (idP && idP !== idProducto)
      throw new Error('Producto no corresponde a ser modificado');
    if (idA && idA !== idAlmacen)
      throw new Error('Almacen no corresponde a ser modificado');

    checkParametros({ idAlmacen, idProducto });

    return await db.query(productosDB.getProductoAlmacen(), [
      getID(idAlmacen),
      getID(idProducto),
    ]);
  } catch (error) {
    throw error;
  }
};

const checkAlmacenProducto = async (req) => {
  const {
    body: { idAlmacen },
    query: { idProducto },
  } = req;

  try {
    checkParametros({ idAlmacen, idProducto });

    return await db.query(productosDB.getProductoAlmacen(), [
      getID(idAlmacen),
      getID(idProducto),
    ]);
  } catch (error) {
    throw error;
  }
};

export const getProductosMarca = async (req) => {
  const { query } = req;

  try {
    const { rows } = await db.query(productosDB.getProductosMarca(), [
      getID(query.idMarca),
    ]);

    rows.forEach((producto) => {
      producto.id = encodeId(producto.id_producto);
      delete producto['id_producto'];
    });

    return rows;
  } catch (error) {
    throw error;
  }
};

export const getProductosCategoria = async (req) => {
  const { query } = req;

  try {
    const { rows } = await db.query(productosDB.getProductosCategoria(), [
      getID(query.idCategoria),
    ]);

    rows.forEach((producto) => {
      producto.id = encodeId(producto.id_categoria);
      delete producto['id_categoria'];
    });

    return rows;
  } catch (error) {
    throw error;
  }
};

export const getProductosNoEstanAlmacen = async (req) => {
  const { query, user } = req;
  let salida = [];
  try {
    const { rowCount } = await db.query(almacenes.getAlmacenNegocio(), [
      getID(query.idAlmacen),
      user.idNegocioActivo,
    ]);

    if (rowCount > 0) {
      const { rows } = await db.query(
        productosDB.getProductosNoEstanAlmacen(),
        [getID(query.idAlmacen), user.idNegocioActivo]
      );

      rows.forEach((item) => {
        item.id = encodeId(item.id_producto);
        delete item.id_producto;
      });

      salida = rows;
    }

    return salida;
  } catch (error) {
    throw error;
  }
};

export const insProductoAlmacen = async (req) => {
  const {
    body: { idProducto, idAlmacen, stockDisponible },
  } = req;

  try {
    checkParametros({ idProducto, idAlmacen, stockDisponible });

    const { rowCount } = await db.query(productosDB.insProductoAlmacen(), [
      getID(idAlmacen),
      getID(idProducto),
      preparaNumero(stockDisponible),
    ]);

    return rowCount;
  } catch (error) {
    throw error;
  }
};

export const getProductosOrden = async (req) => {
  const { query, body } = req;
  const idOrden = query?.idOrden ?? body?.idOrden;

  try {
    const { rows } = await db.query(productosDB.getProductosOrden(), [
      getID(idOrden),
    ]);

    return rows.map((item) => {
      const res = {
        id: encodeId(item.id_producto),
        idUnidadMedida: item.id_unidad_medida,
        ...item,
      };
      const { id_producto, id_unidad_medida, ...salida } = res;
      return salida;
    });
  } catch (error) {
    throw error;
  }
};

export const getProductosOrdenVenta = async (req) => {
  const { query, body } = req;
  const idOrdenVenta = query?.idOrdenVenta ?? body?.idOrdenVenta;

  try {
    const { rows } = await db.query(productosDB.getProductosOrdenVenta(), [
      getID(idOrdenVenta),
    ]);

    rows.forEach((item) => {
      item.id = encodeId(item.id_producto);
      item.idAlmacen = encodeId(item.id_almacen);
      delete item.id_producto;
      delete item.id_almacen;
    });

    return rows;
  } catch (error) {
    throw error;
  }
};

const getProductosVoucher = async (req) => {
  const { query, body } = req;
  const idOrdenVenta = query?.idOrdenVenta ?? body?.idOrdenVenta;

  try {
    const { rows } = await db.query(productosDB.getProductosVoucher(), [
      getID(idOrdenVenta),
    ]);

    return rows.map((item) => {
      const tmp = {
        id: encodeId(item.id_producto),
        idAlmacen: encodeId(item.id_almacen),
        ...item,
        stock_disponible: item.stock_disponible ?? 1000,
        precio_detalle: item.precio_cliente ?? item.precio_detalle,
        fake_stock: !item.stock_disponible,
      };
      const { id_producto, id_almacen, ...salida } = tmp;
      return salida;
    });
  } catch (error) {
    throw error;
  }
};

export const getProductosNoEstanOrden = async (req) => {
  const { user, query } = req;
  let salida = {};

  try {
    const orden = await db.query(ordenesDB.getOrdenSimple(), [
      getID(query.idOrden),
      user.idNegocioActivo,
    ]);

    if (orden.rowCount > 0) {
      if (orden.rows[0].es_interno) {
        salida = await db.query(productosDB.getProductosAlmacenNoEstanOrden(), [
          orden.rows[0].id_orden,
          orden.rows[0].id_origen,
        ]);
      } else {
        salida = await db.query(
          productosDB.getProductosProveedorNoEstanOrden(),
          [orden.rows[0].id_orden]
        );
      }

      salida.rows.forEach((item) => {
        item.id = encodeId(item.id_producto);
        delete item.id_producto;
      });
    }

    return salida.rows;
  } catch (error) {
    throw error;
  }
};

export const updProductoOrden = async (req) => {
  const { body, user } = req;
  const { idOrden, idProducto, idUnidadMedida, cantidad, datosAdicionales } =
    body;

  try {
    checkParametros({
      idOrden,
      idProducto,
      cantidad,
      idUnidadMedida,
      datosAdicionales,
    });

    if (datosAdicionales?.cantidadRecibida) {
      if (datosAdicionales?.cantidadRecibida > cantidad) {
        const { rows } = await db.query(ordenesDB.getOrden(), [
          getID(idOrden),
          user.idNegocioActivo,
        ]);

        if (rows.length > 0 && rows[0].es_interno) {
          const idAlmacenOrigen = rows[0].id_origen;

          const prodAlmacenOrigen = await db.query(
            productosDB.getProductoAlmacen(),
            [idAlmacenOrigen, getID(idProducto)]
          );
          const quitar = datosAdicionales.cantidadRecibida - cantidad;

          await db.query(productosDB.updProductoAlmacen(), [
            idAlmacenOrigen,
            getID(idProducto),
            user.idNegocioActivo,
            prodAlmacenOrigen.rows[0].stock_disponible - quitar,
            prodAlmacenOrigen.rows[0].datos_adicionales,
          ]);
        }
      }
    }

    const { rowCount } = await db.query(productosDB.updProductoOrden(), [
      getID(idOrden),
      getID(idProducto),
      cantidad,
      idUnidadMedida,
      datosAdicionales,
    ]);

    return rowCount;
  } catch (error) {
    throw error;
  }
};

export const delProductoOrden = async (req) => {
  const { idOrden, idProducto } = req.body;

  try {
    checkParametros({
      idOrden,
      idProducto,
    });

    return await db.query(productosDB.delProductoOrden(), [
      getID(idOrden),
      getID(idProducto),
    ]);
  } catch (error) {
    throw error;
  }
};

export const insProductoOrden = async (req) => {
  const { idOrden, idProducto, cantidad, idUnidadMedida } = req.body;

  try {
    checkParametros({
      idOrden,
      idProducto,
      idUnidadMedida,
      cantidad,
    });

    const { rowCount } = await db.query(productosDB.insProductoOrden(), [
      getID(idOrden),
      getID(idProducto),
      idUnidadMedida,
      cantidad,
    ]);

    return rowCount;
  } catch (error) {
    throw error;
  }
};

export const checkProductoOrden = async (req) => {
  const { idOrden, idProducto } = req.body;

  try {
    checkParametros({ idOrden, idProducto });

    return await db.query(productosDB.getProductoOrden(), [
      getID(idOrden),
      getID(idProducto),
    ]);
  } catch (error) {
    throw error;
  }
};

export const getProductosMejorVendidos = async (req) => {
  const {
    query: { idAlmacen },
  } = req;

  try {
    const endToday = momentTz().tz(TIMEZONE).endOf('day').format();
    const lastWeek = momentTz()
      .tz(TIMEZONE)
      .subtract(6, 'day')
      .startOf('day')
      .format();

    const { rows } = await db.query(productosDB.getProductosMejorVendidos(), [
      getID(idAlmacen),
      lastWeek,
      endToday,
      TIPOS_VENTA.VENTA,
    ]);

    rows.forEach((item) => {
      item.id = encodeId(item.id_producto);
      delete item.id_producto;
    });

    return rows;
  } catch (error) {
    throw error;
  }
};

export const getProductosBajoStock = async (req) => {
  const { user } = req;

  try {
    const { rows } = await db.query(productosDB.getProductosBajoStock(), [
      user.idNegocioActivo,
      ALERTA_STOCK.AMARILLO,
      ESTADOS_BOOLEAN.ACTIVO,
      ESTADOS_ALMACEN.HABILITADO,
    ]);

    return rows.map((item) => {
      const tmp = {
        id: encodeId(item.id_producto),
        id_almacen: encodeId(item.id_almacen),
        ...item,
      };
      const { id_producto, ...salida } = tmp;
      return salida;
    });
  } catch (error) {
    throw error;
  }
};

export const addCreateProductoCliente = async (req) => {
  const { body, user } = req;
  const { idCliente, precioVenta, glosa } = body;

  const client = await db.pool.connect();

  try {
    checkParametros({ idCliente, glosa, precioVenta });

    await client.query('BEGIN');

    const { rows } = await client.query(productosDB.insProducto(), [
      user.idNegocioActivo,
      null,
      null,
      limpiaString(glosa),
      '',
      1,
      1,
      1,
      1,
      1,
      '',
      '',
    ]);

    const idProducto = rows[0].id_producto;

    const { rowCount } = await client.query(productosDB.insProductoCliente(), [
      getID(idCliente),
      idProducto,
      precioVenta,
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

export const getProductosTodos = async (req) => {
  const { user } = req;

  try {
    return await db.query(productosDB.getProductosTodos(), [
      user.idNegocioActivo,
    ]);
  } catch (error) {
    throw error;
  }
};

const productoComponent = {
  addCreateProductoCliente,
  checkAlmacenProducto,
  checkProducto,
  checkProductoAlmacen,
  checkProductoOrden,
  delProductoAlmacen,
  delProductoCliente,
  delProductoOrden,
  getProducto,
  getProductos,
  getProductosActivosOrden,
  getProductosAlmacen,
  getProductosAlmacenVenta,
  getProductosBajoStock,
  getProductosCategoria,
  getProductosClienteNegocio,
  getProductosClienteNegocioLibres,
  getProductosMarca,
  getProductosMejorVendidos,
  getProductosNoEstanAlmacen,
  getProductosNoEstanOrden,
  getProductosOrden,
  getProductosOrdenVenta,
  getProductosProveedor,
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
  updProductoCliente,
  updProductoOrden,
};

export default productoComponent;
