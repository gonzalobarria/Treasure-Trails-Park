import productoComponent from 'serverTools/components/producto';
import base from './base64Storage';
import { ESTADOS_ORDEN } from './enums';
import { numberFormat } from './utiles';

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

export const setHeaderOrden = async (doc) => {
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

export const setOrdeInfo = (doc, orden) => {
  const pageWidth = doc.internal.pageSize.width;
  let xPos = MARGIN;
  const yPos = 80;

  doc.setDrawColor(0);
  doc.setFillColor(248, 248, 248);
  doc.roundedRect(xPos, yPos - 15, pageWidth - MARGIN * 2, 45, 3, 3, 'F');

  doc
    .text('Origen del Pedido', xPos + 10, yPos)
    .text(
      orden.glosa_bodega_origen ?? orden.glosa_proveedor_origen ?? '',
      xPos + 10,
      yPos + 10
    )
    .text(orden.fecha_creacion, xPos + 10, yPos + 20);

  xPos = pageWidth - MARGIN;

  doc
    .text('Dirección de Despacho', xPos - 10, yPos, { align: 'right' })
    .setFont('Helvetica', '', 'bold')
    .text(
      orden.datos_adicionales_almacen?.direccion ?? '',
      xPos - 10,
      yPos + 10,
      {
        align: 'right',
      }
    )
    .setFont('Helvetica', '', 'normal')
    .text(orden.destino, xPos - 10, yPos + 20, { align: 'right' });
};

export const addTableOrden = async (doc, req, orden) => {
  const ancho = doc.internal.pageSize.width;
  const anchoTabla = ancho - MARGIN * 2;
  const productos = await productoComponent.getProductosOrden(req);
  const { dataURI, width, height } = await base.getImageData(LOGO_PATH);

  const { EN_PROCESO, ENVIADO, RECIBIDO, PREORDER_GENERADA } = ESTADOS_ORDEN;

  let headArr = ['Glosa', 'Unidad de Medida', 'Cantidad Solicitada'];
  let body;
  let anchoGlosa = 5;

  if ([EN_PROCESO, PREORDER_GENERADA].includes(orden.id_estado)) {
    headArr = ['Glosa', 'Unidad de Medida', 'Cantidad Solicitada'];
    body = productos.map((p) => [p.glosa, p.glosa_unidad_medida, p.cantidad]);
    anchoGlosa = 6;
  }
  if ([ENVIADO, RECIBIDO].includes(orden.id_estado)) {
    headArr = [
      'Glosa',
      'Unidad de Medida',
      'Cantidad Solicitada',
      'Cantidad Recibida',
    ];
    body = productos.map((p) => [
      p.glosa,
      p.glosa_unidad_medida,
      p.cantidad,
      `${numberFormat(p.datos_adicionales?.cantidadRecibida)}`,
    ]);
  }

  doc.autoTable({
    head: [headArr],
    startY: MARGIN_HEADER + 50, // solo primera página
    headStyles: { fillColor: [28, 184, 209] },
    bodyStyles: { minCellHeight: 20, valign: 'middle' },
    columnStyles: {
      0: { cellWidth: (anchoTabla * anchoGlosa) / 8 },
      1: { halign: 'right', cellWidth: anchoTabla / 8 },
      2: { halign: 'right', cellWidth: anchoTabla / 8 },
      3: { halign: 'right', cellWidth: anchoTabla / 8 },
    },
    body,
    didParseCell: (hookData) => {
      if (hookData.section === 'head') {
        hookData.cell.styles.valign = 'middle';
        hookData.cell.styles.valign = 'middle';
        if ([1, 2, 3].includes(hookData.column.dataKey)) {
          hookData.cell.styles.halign = 'right';
        }
      }
    },
    didDrawPage: () => setWatermark(doc, { dataURI, width, height }),
  });
};
