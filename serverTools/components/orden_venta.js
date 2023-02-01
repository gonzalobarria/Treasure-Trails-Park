import momentTz from 'moment-timezone';
import db from '../db';
import ordenesVenta from '../db/ordenes_venta';
import {
  FUNCIONALIDADES,
  ESTADOS_ORDEN_VENTA,
  TIPOS_VENTA,
  TIPOS_PAGO,
  TIPOS_VENTA_OV,
} from '../utils/enums';
import { format } from 'date-fns';
import {
  checkParametros,
  encodeId,
  getID,
  postDataPaginada,
  preQueryData,
} from '../utils/utiles';
import productosDB from '../db/productos';
import almacenesDB from '../db/almacenes';
import { TIMEZONE } from 'lib/constants';

export const buscaOrdenVenta = async (body) => {
  const { textSearch } = body;

  try {
    checkParametros({ textSearch });

    const { rows } = await db.query(ordenesVenta.buscaOrdenesVenta(), [
      textSearch,
    ]);

    rows.forEach((orden) => {
      orden.id_orden_venta = encodeId(orden.id_orden_venta);
    });

    return { rows };
  } catch (error) {
    throw error;
  }
};

export const insOrdenVenta = async (req) => {
  const { user, body } = req;
  const { EMBALAJE, DETALLE } = TIPOS_VENTA_OV;

  const client = await db.pool.connect();
  const idUsuarioCajero = user.id;

  let { productos, totalPagar, metodoPago, idAlmacenActivo, idCliente } = body;

  try {
    checkParametros({ productos, totalPagar, metodoPago, idAlmacenActivo });

    //revisar que el idAlmacenActivo lo tenga el usuario que está en sesión

    if (productos?.length == 0) throw new Error('error.orden-sin-productos');

    const idNegocio = user.idNegocioActivo;
    const idAlmacen = getID(idAlmacenActivo);

    const almacenArr = productos.map((p) => getID(p.idAlmacen));

    const { rows: productosAlmacenes } = await db.query(
      productosDB.getProductosAlmacenes(),
      [almacenArr]
    );

    const xx = productos.map((p) => {
      if (p.fakeStock) return p;

      const prodBD = productosAlmacenes.find(
        (prod) =>
          prod.id_producto === getID(p.id) &&
          prod.id_almacen === getID(p.idAlmacen)
      );

      const maxProd =
        p.idTipoVenta === EMBALAJE
          ? Math.floor(
              (prodBD.stock_disponible * prodBD.unidades_venta) /
                prodBD.unidades_embalaje
            )
          : prodBD.stock_disponible;

      if (p.qty > maxProd) p.error = true;

      return p;
    });

    if (xx.find((x) => x.error))
      throw new Error('error.producto-sin-stock-suficiente');

    await client.query('BEGIN');

    const ordenVenta = await client.query(ordenesVenta.insOrdenVenta(), [
      idAlmacen,
      idUsuarioCajero,
      getID(idCliente) ?? null,
      totalPagar,
      null,
      metodoPago !== TIPOS_PAGO.SIN_PAGO
        ? TIPOS_VENTA.VENTA
        : TIPOS_VENTA.COTIZACION,
      metodoPago,
      ESTADOS_ORDEN_VENTA.FINALIZADO, // TODO Revisar de donde saco el estado para la creación de la ordenVenta
    ]);

    productos.forEach(async (p) => {
      const idProducto = getID(p.id);
      const idAlmacen = getID(p.idAlmacen);

      await client.query(ordenesVenta.insProductoAlmacenOrdenVenta(), [
        ordenVenta.rows[0].id_orden_venta,
        idProducto,
        idAlmacen,
        p.idTipoVenta,
        p.price,
        p.qty,
        {},
      ]);

      if (p.fakeStock) return;

      const prodTMP = productosAlmacenes.find(
        (p) => p.id_producto === idProducto && p.id_almacen === idAlmacen
      );

      const cantVenta =
        p.idTipoVenta === DETALLE
          ? p.qty
          : Math.floor(
              (p.qty * prodTMP.unidades_embalaje) / prodTMP.unidades_venta
            );

      const nuevaCantidad =
        metodoPago !== TIPOS_PAGO.SIN_PAGO
          ? prodTMP?.stock_disponible - cantVenta
          : prodTMP?.stock_disponible;

      prodTMP.stock_disponible = nuevaCantidad;

      const datosAdicionales = prodTMP?.datos_adicionales || {};

      await client.query(productosDB.updProductoAlmacenVenta(), [
        idAlmacen,
        idProducto,
        idNegocio,
        nuevaCantidad,
        datosAdicionales,
      ]);
    });

    await client.query('COMMIT');

    const enviaImprimirTicket = async (
      idAlmacen,
      productos,
      ordenVenta,
      user,
      totalPagar
    ) => {
      const rellenaCeros = (num, largo) => String(num).padStart(largo, '0');

      const idOrdenVenta = rellenaCeros(ordenVenta.rows[0].id_orden_venta, 4);

      const codBar =
        rellenaCeros(idAlmacen, 4) +
        rellenaCeros(user.id, 4) +
        rellenaCeros(totalPagar, 4);

      const newTZ = momentTz.tz(ordenVenta.rows[0].fecha_creacion, TIMEZONE);

      const productosTicket = productos.map((p) => ({
        precioUnitario: p.price,
        cantidad: p.qty,
        nombre: p.title,
        precioTotal: p.totalPagar,
      }));

      let datosAdicionales = {};
      const { rows } = await db.query(almacenesDB.getAlmacen(), [idAlmacen]);

      rows.forEach((almacen) => {
        datosAdicionales = almacen.datos_adicionales;
      });

      const urlTunnel = datosAdicionales?.urlTunnel;

      if (urlTunnel) {
        const datosTicket = {
          cabecera: {
            dia: newTZ.local().format('DD/MM/YYYY'),
            hora: newTZ.local().format('HH:mm'),
            registro: idOrdenVenta,
            codBar,
            local: {
              nombre: idAlmacen,
              cajero: user.nombre,
            },
          },
          detalle: productosTicket,
          resumen: {
            total: totalPagar,
          },
        };

        try {
          await fetch(`${urlTunnel}/api/print/test`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Bypass-Tunnel-Reminder': 'bypass',
            },
            body: JSON.stringify(datosTicket),
          });
        } catch (error) {
          throw error;
        }
      }
    };

    await enviaImprimirTicket(
      idAlmacen,
      productos,
      ordenVenta,
      user,
      totalPagar
    );

    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const getOrdenesVenta = async (req) => {
  const { query, user } = req;

  try {
    const preData = preQueryData(query);

    const idOrdenVenta = query?.idOrdenVenta ?? undefined;
    const fechaDesde = query?.fechaDesde ?? undefined;
    const fechaHasta = query?.fechaHasta ?? undefined;
    preData.search = idOrdenVenta || (fechaDesde && fechaHasta);

    const { rows } = await db.query(
      ordenesVenta.getOrdenesVenta(
        preData.orderBy,
        idOrdenVenta,
        fechaDesde,
        fechaHasta
      ),
      [
        preData.pageSize,
        preData.offset,
        user.idNegocioActivo,
        idOrdenVenta,
        fechaDesde,
        fechaHasta,
      ]
    );

    const datosNegocioActivo = user.negociosUsuario.find(
      (item) => user.idNegocioActivo === item.id_negocio
    );

    const verOrdenVenta = datosNegocioActivo.func.find(
      (f) => f === FUNCIONALIDADES.Ver_Orden_Venta
    );

    if (verOrdenVenta)
      rows = rows.filter((oV) => oV.id_usuario_cajero === user.id);

    rows.forEach((item) => {
      item.id = encodeId(item.id_orden_venta);
      item.id_negocio = encodeId(item.id_negocio);
      item.id_usuario_cajero = encodeId(item.id_usuario_cajero);
      item.id_cliente = encodeId(item.id_cliente);
      item.id_estado = encodeId(item.id_estado);
      item.fecha_creacion = momentTz
        .tz(item.fecha_creacion, TIMEZONE)
        .format('DD/MM/YYYY HH:mm');
      // delete ordenVenta['id_orden_venta'];
    });

    return postDataPaginada(preData, rows);

    // return salida;
  } catch (error) {
    throw error;
  }
};

export const getOrdenesVentaSemana = async (req) => {
  try {
    const {
      query: { idAlmacen },
    } = req;

    const endToday = momentTz().tz(TIMEZONE).endOf('day').format();
    const lastWeek = momentTz()
      .tz(TIMEZONE)
      .subtract(6, 'day')
      .startOf('day')
      .format();

    const { rows } = await db.query(ordenesVenta.getOrdenesVentaSemana(), [
      getID(idAlmacen),
      lastWeek,
      endToday,
      TIPOS_VENTA.VENTA,
      TIMEZONE,
    ]);

    rows.forEach((item) => {
      item.dia = momentTz(item.dia).format('YYYY-MM-DD');
    });

    return rows;
  } catch (error) {
    throw error;
  }
};

export const getOrdenesVentaSemanaMonto = async () => {
  try {
    const endToday = momentTz().tz(TIMEZONE).endOf('day').format();
    const lastWeek = momentTz()
      .tz(TIMEZONE)
      .subtract(6, 'day')
      .startOf('day')
      .format();

    const { rows } = await db.query(ordenesVenta.getOrdenesVentaSemanaMonto(), [
      lastWeek,
      endToday,
      TIPOS_VENTA.VENTA,
      TIMEZONE,
    ]);

    rows.forEach((item) => {
      item.id_almacen = encodeId(item.id_almacen);
      item.dia = momentTz(item.dia).format('YYYY-MM-DD');
    });

    return rows;
  } catch (error) {
    throw error;
  }
};

export const getOrdenVentaActivos = async () => {
  try {
    const { rows } = await db.query(ordenesVenta.getOrdenVentaActivos(), []);

    rows.forEach((orden) => {
      orden.id_orden_venta = encodeId(orden.id_orden_venta);
    });

    return { rows };
  } catch (error) {
    throw error;
  }
};

export const getOrdenVenta = async (req) => {
  const { query, body, user } = req;
  const idOrdenVenta = query.idOrdenVenta
    ? query.idOrdenVenta
    : body.idOrdenVenta;

  try {
    const { rows } = await db.query(ordenesVenta.getOrdenVenta(), [
      getID(idOrdenVenta),
      user.idNegocioActivo,
    ]);

    rows.forEach((item) => {
      // item.id_orden_venta = encodeId(item.id_orden_venta);
      item.id_negocio = encodeId(item.id_negocio);
      item.id_estado = encodeId(item.id_estado);
      item.fecha_creacion = momentTz
        .tz(item.fecha_creacion, TIMEZONE)
        .format('DD/MM/YYYY HH:mm');
    });

    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const updOrdenVenta = async (idOrdenVenta, body) => {
  const { glosa, descripcion, datosAdicionales, activo, idMarca } = body;

  try {
    checkParametros({
      glosa,
      descripcion,
      datosAdicionales,
      activo,
      idMarca,
    });

    const { rowCount } = await db.query(ordenesVenta.updOrdenVenta(), [
      idOrdenVenta,
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

export const getOrdenesVentaAlmacen = async (req) => {
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

    const { rows } = await db.query(ordenesVenta.getOrdenesVentaAlmacen(), [
      pageSize,
      offset,
      idNegocio,
      idAlmacen,
    ]);

    rows.forEach((orden) => {
      orden.id = encodeId(orden.id_orden_venta);
      delete orden['id_orden_venta'];

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

export const getOrdenesVentaProveedor = async (req) => {
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

    const { rows } = await db.query(ordenesVenta.getOrdenesProveedor(), [
      pageSize,
      offset,
      idNegocio,
      idProveedor,
    ]);

    rows.forEach((orden) => {
      orden.id = encodeId(orden.id_orden_venta);
      delete orden['id_orden_venta'];

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

export const getOrdenesVentaMarca = async (req) => {
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

    const { rows } = await db.query(ordenesVenta.getOrdenesVentaMarca(), [
      pageSize,
      offset,
      idNegocio,
      idMarca,
    ]);

    rows.forEach((orden) => {
      orden.id = encodeId(orden.id_orden_venta);
      delete orden['id_orden_venta'];

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

export const updPhotoOrdenVenta = async (req) => {
  const idOrden = getID(req.body.idOrden);
  try {
    let urlPhoto;
    if (req.files && req.files.length > 0 && req.files[0].cloudStoragePublicUrl)
      urlPhoto = req.files[0].cloudStoragePublicUrl;

    const { rows } = await db.query(ordenesVenta.getOrdenVenta(), [idOrden]);

    let datosAdicionales = rows[0].datos_adicionales || {};
    datosAdicionales.imgURL = urlPhoto;

    rows[0].datos_adicionales = datosAdicionales;

    return await db.query(ordenesVenta.updPhotoOrdenVenta(), [
      idOrden,
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

    return await db.query(ordenesVenta.updOrdenUsuarioReceptor(), [
      getID(idOrden),
      req.user.idNegocioActivo,
      getID(idUsuario),
    ]);
  } catch (error) {
    throw error;
  }
};

const ordenVentaComponent = {
  buscaOrdenVenta,
  insOrdenVenta,
  getOrdenesVenta,
  getOrdenesVentaSemana,
  getOrdenesVentaSemanaMonto,
  getOrdenVentaActivos,
  getOrdenVenta,
  updOrdenVenta,
  getOrdenesVentaAlmacen,
  getOrdenesVentaProveedor,
  getOrdenesVentaMarca,
  updPhotoOrdenVenta,
  updOrdenUsuarioReceptor,
};

export default ordenVentaComponent;
