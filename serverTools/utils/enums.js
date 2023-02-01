export const TIPOS_INGRESO = {
  CONCLAVE: 1,
  FACEBOOK: 2,
  GOOGLE: 3,
};

export const ESTADOS_USUARIO = {
  ACTIVO: 1,
  BLOQUEDADO: 2,
  ELIMINADO: 3,
};

export const ROLES = {
  ADMINISTRADOR: 1,
  PROVEEDOR: 2,
  CLIENTE: 3,
};

export const ESTADOS_PRODUCTO = {
  DISPONIBLE: 1,
  AGOTADO: 2,
  ELIMINADO: 3,
};

export const ESTADOS_PROVEEDOR = {
  ACTIVO: 1,
  PRUEBAS: 2,
  DESACTIVADO: 3,
};

export const ESTADOS_ALMACEN = {
  HABILITADO: 1,
  MANTENCION: 2,
  ELIMINADO: 3,
};

export const ACCIONES = {
  ACTIVACION: 1,
  ELIMINACION: 'delete',
};

export const ESTADOS_ORDEN = {
  EN_PROCESO: 1,
  ENVIADO: 2,
  ELIMINADO: 3,
  RECIBIDO: 4,
  PREORDER_GENERADA: 5,
};

export const TIPOS_ALMACEN = {
  BODEGA: 1,
  LOCAL: 2,
};

export const TIPOS_PAGO = {
  EFECTIVO: 1,
  TARJETA: 2,
  SIN_PAGO: 3,
  TRANSFERENCIA: 4,
};

export const TIPOS_VENTA = {
  VENTA: 1,
  COTIZACION: 2,
  GUIA_DE_DESPACHO: 3,
};

export const TIPOS_VENTA_OV = {
  DETALLE: 1,
  EMBALAJE: 2,
};

export const ESTADOS_ORDEN_VENTA = {
  FINALIZADO: 1,
  CANCELADO: 2,
  PENDIENTE: 3,
};

export const ESTADOS_BOOLEAN = {
  ACTIVO: true,
  INACTIVO: false,
};

export const ALERTA_STOCK = {
  ROJO: 20,
  AMARILLO: 50,
};

export const ERROR_CODES = {
  23505: 'error.item-repetido',
};

export const FUNCIONALIDADES = {
  Control_Total_de_la_Plataforma: 100,
  Control_Total_del_Negocio: 200,
  Ingresar_Almacen: 301,
  Ver_Almacen: 302,
  Actualizar_Almacen: 303,
  Eliminar_Almacen: 304,
  Agregar_Producto_al_Almacén: 401,
  Ver_Producto_del_Almacén: 402,
  Actualizar_Producto_del_Almacén: 403,
  Eliminar_Producto_del_Almacén: 404,
  Crear_Orden: 501,
  Ver_Orden: 502,
  Actualizar_Orden: 503,
  Eliminar_Órdenes: 504,
  Ingresar_Proveedor: 601,
  Ver_Proveedor: 602,
  Actualizar_Proveedor: 603,
  Eliminar_Proveedor: 604,
  Agregar_Producto: 701,
  Ver_Producto: 702,
  Actualizar_Producto: 703,
  Eliminar_Producto: 704,
  Asociar_Producto_a_un_Proveedor: 801,
  Ver_Asociación_de_Productos_con_Proveedor: 802,
  Actualizar_Asociación_de_Productos_con_Proveedor: 803,
  Eliminar_Asociación_de_Productos_con_Proveedor: 804,
  Ingresar_Negocio: 901,
  Ver_Negocio: 902,
  Actualizar_Negocio: 903,
  Eliminar_Negocio: 904,
  Agregar_Usuario: 1001,
  Ver_Usuario: 1002,
  Actualizar_Usuario: 1003,
  Eliminar_Usuario: 1004,
  Agregar_Marca: 1101,
  Ver_Marca: 1102,
  Actualizar_Marca: 1103,
  Eliminar_Marca: 1104,
  Agregar_Cliente: 1201,
  Ver_Cliente: 1202,
  Actualizar_Cliente: 1203,
  Eliminar_Cliente: 1204,
  Agregar_Categoria: 1301,
  Ver_Categoria: 1302,
  Actualizar_Categoria: 1303,
  Eliminar_Categoria: 1304,
  Agregar_Orden_Venta: 1401,
  Ver_Orden_Venta: 1402,
  Actualizar_Orden_Venta: 1403,
  Eliminar_Orden_Venta: 1404,
  Control_Total_del_Proveedor: 2000,
};
