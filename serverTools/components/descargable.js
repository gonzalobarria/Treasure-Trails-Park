import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import {
  addTableOrden,
  setHeaderOrden,
  setOrdeInfo,
} from 'serverTools/utils/ordenPDF';
import {
  addTableOrdenVenta,
  setHeaderOrdenventa,
  setInfoOrdenVenta,
} from 'serverTools/utils/ordenVentaPDF';
import {
  addTableProductos,
  setFooterProductos,
  setHeaderProductos,
} from 'serverTools/utils/productosPDF';
import ordenComponent from './orden';
import ordenVentaComponent from './orden_venta';

const getProductosPDF = async (req) => {
  const doc = new jsPDF('l', 'px', 'letter', true);

  await setHeaderProductos(doc);
  await addTableProductos(doc, req);
  setFooterProductos(doc);

  return doc.output('datauristring');
};

const getOrdenPDF = async (req) => {
  const doc = new jsPDF('p', 'px', 'letter', true);
  const orden = await ordenComponent.getOrden(req);

  await setHeaderOrden(doc);
  setOrdeInfo(doc, orden);
  await addTableOrden(doc, req, orden);

  return doc.output('datauristring');
};

const getOrdenVentaPDF = async (req) => {
  const doc = new jsPDF('p', 'px', 'letter', true);
  const orden = await ordenVentaComponent.getOrdenVenta(req);

  await setHeaderOrdenventa(doc);
  setInfoOrdenVenta(doc, orden);
  await addTableOrdenVenta(doc, req, orden);

  return doc.output('datauristring');
};

const descargableComponent = {
  getOrdenPDF,
  getOrdenVentaPDF,
  getProductosPDF,
};

export default descargableComponent;
