import productoComponent from 'serverTools/components/producto';
import base from './base64Storage';
import { numberFormat, priceFormat } from './utiles';

const MAX_LOGO_HEIGHT = 30;
const LOGO_PATH =
  'https://firebasestorage.googleapis.com/v0/b/valerne-webapp.appspot.com/o/app%2Flogo-valerne.png?alt=media&token=db56ca19-d4b0-46cc-b53b-2def99840669';
const MARGIN_HEADER = 70;
const MARGIN = 30;
const PROPORCION = 0.6;

const getLogo = async () => {
  const { dataURI, width, height } = await base.getImageData(LOGO_PATH);

  const nHeight = height > MAX_LOGO_HEIGHT ? MAX_LOGO_HEIGHT : height;
  const nWidth = (width * nHeight) / height;

  return { dataURI, width: nWidth, height: nHeight };
};

const setWatermark = (doc, { dataURI, width, height }) => {
  doc.saveGraphicsState();
  doc.setGState(new doc.GState({ opacity: 0.05 }));
  doc.addImage(
    dataURI,
    'JPEG',
    70,
    80,
    width * PROPORCION,
    height * PROPORCION,
    undefined,
    'FAST',
    -30
  );
  doc.restoreGraphicsState();
};

export const setHeaderOrdenventa = async (doc) => {
  const { dataURI, width, height } = await getLogo();
  const pageWidth = doc.internal.pageSize.width;
  const xPos = pageWidth - MARGIN;

  doc.addImage(dataURI, 'JPEG', 30, 20, width, height, undefined, 'FAST');
  doc
    .setFontSize(10)
    .text('Comercializadora Trigo Limitada', xPos, MARGIN, { align: 'right' })
    .text('Antonia López de Bello 743-568, Recoleta', xPos, MARGIN + 10, {
      align: 'right',
    })
    .text('Santiago', xPos, MARGIN + 20, { align: 'right' });
};

export const setInfoOrdenVenta = (doc, ordenVenta) => {
  const pageWidth = doc.internal.pageSize.width;
  const {
    id_orden_venta: idOrdenVenta,
    fecha_creacion: fechaCompra,
    glosa_tipo_pago: metodoPago,
  } = ordenVenta;
  let xPos = MARGIN;
  const yPos = 80;

  doc.setDrawColor(0);
  doc.setFillColor(248, 248, 248);
  doc.roundedRect(xPos, yPos - 15, pageWidth - MARGIN * 2, 45, 3, 3, 'F');

  doc
    .text(`Orden Venta: ${idOrdenVenta}`, xPos + 10, yPos)
    .text(`Fecha de Compra: ${fechaCompra}`, xPos + 10, yPos + 10)
    .text(`Método de Pago: ${metodoPago}`, xPos + 10, yPos + 20);
};

export const addTableOrdenVenta = async (doc, req, ordenVenta) => {
  const ancho = doc.internal.pageSize.width;
  const anchoTabla = ancho - MARGIN * 2;
  const productos = await productoComponent.getProductosOrdenVenta(req);
  const { dataURI, width, height } = await base.getImageData(LOGO_PATH);

  let headArr = [
    'Nombre del Producto',
    'Almacén',
    'Cantidad',
    'Precio Unidad Venta',
    'Total Venta',
  ];
  let anchoGlosa = 2;

  const body = productos.map((p) => [
    p.glosa,
    p.glosa_almacen,
    numberFormat(p.cantidad),
    priceFormat(p.precio_venta),
    priceFormat(p.precio_venta * p.cantidad),
  ]);

  const total = productos
    .map((p) => ({
      totalVenta: p.precio_venta * p.cantidad,
    }))
    .reduce((prev, cur) => ({
      totalVenta: prev.totalVenta + cur.totalVenta,
    }));

  body.push(['Total Venta', '', '', '', priceFormat(total.totalVenta)]);

  doc.autoTable({
    head: [headArr],
    startY: MARGIN_HEADER + 50, // solo primera página
    headStyles: { fillColor: [28, 184, 209] },
    bodyStyles: { minCellHeight: 20, valign: 'middle' },
    columnStyles: {
      0: { cellWidth: (anchoTabla * 3) / 9 },
      1: { cellWidth: (anchoTabla * 2.5) / 9 },
      2: { halign: 'right', cellWidth: anchoTabla / 9 },
      3: { halign: 'right', cellWidth: anchoTabla / 9 },
      4: { halign: 'right', cellWidth: (anchoTabla * 1.5) / 9 },
    },
    body,
    didParseCell: (hookData) => {
      if (hookData.section === 'head') {
        hookData.cell.styles.valign = 'middle';
        hookData.cell.styles.valign = 'middle';
        if ([2, 3, 4].includes(hookData.column.dataKey)) {
          hookData.cell.styles.halign = 'right';
        }
      }

      const rows = hookData.table.body;
      if (hookData.row.index === rows.length - 1) {
        hookData.cell.styles.fillColor = [28, 184, 209];
        hookData.cell.styles.fontStyle = 'bold';
        hookData.cell.styles.textColor = [255, 255, 255];
        if ([0].includes(hookData.column.dataKey)) {
          hookData.cell.colSpan = 4;
          hookData.cell.styles.halign = 'right';
        }
      }
    },
    didDrawPage: () => setWatermark(doc, { dataURI, width, height }),
  });
};

export const setFooterOrden = (doc) => {
  const pageCount = doc.internal.getNumberOfPages(); // Total Page Number
  for (let i = 0; i < pageCount; i++) {
    doc.setPage(i);

    const pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; // Current Page

    doc.setFontSize(8);
    doc.text(
      `${pageCurrent} de ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - MARGIN,
      { align: 'center' }
    );
  }
};
