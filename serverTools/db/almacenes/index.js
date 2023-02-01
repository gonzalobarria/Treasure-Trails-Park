import { getAlmacen } from './get_almacen';
import { getAlmacenNegocio } from './get_almacen_negocio';
import { getAlmacenXGlosa } from './get_almacen_glosa';
import { getAlmacenes } from './get_almacenes';
import { getAlmacenesActivos } from './get_almacenes_activos';
import { getAlmacenesEstado } from './get_almacenes_estado';
import { getAlmacenesProducto } from './get_almacenes_producto';
import { getAlmacenesNoEstaProducto } from './get_almacenes_no_esta_producto';
import { getCategoríasPorPadre } from './get_categorias_por_padre';
import { getCategoríasProductosAlmacen } from './get_categorias_productos_almacen';
import { insAlmacen } from './ins_almacen';
import { updAlmacen } from './upd_almacen';
import { updEstadoAlmacen } from './upd_estado_almacen';
import { updPhotoAlmacen } from './upd_photo_almacen';
import { updTunnel } from './upd_tunnel';

const almacenes = {
  getAlmacen,
  getAlmacenNegocio,
  getAlmacenXGlosa,
  getAlmacenes,
  getAlmacenesActivos,
  getAlmacenesEstado,
  getAlmacenesProducto,
  getAlmacenesNoEstaProducto,
  getCategoríasPorPadre,
  getCategoríasProductosAlmacen,
  insAlmacen,
  updAlmacen,
  updEstadoAlmacen,
  updPhotoAlmacen,
  updTunnel,
};

export default almacenes;
