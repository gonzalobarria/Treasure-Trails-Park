import productoComponent from 'serverTools/components/producto';
import base from 'serverTools/utils/base64Storage';
import { getID, numberFormat, priceFormat } from './utiles';

const MAX_LOGO_HEIGHT = 30;
const LOGO_PATH =
  'https://firebasestorage.googleapis.com/v0/b/valerne-webapp.appspot.com/o/app%2Flogo-valerne.png?alt=media&token=db56ca19-d4b0-46cc-b53b-2def99840669';
const MARGIN_HEADER = 70;
const MARGIN = 30;

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
    100,
    40,
    width * 0.75,
    height * 0.75,
    undefined,
    'FAST',
    -30
  );
  doc.restoreGraphicsState();
};

const getTablaProductos = async (req) => {
  const { idMarca, idCategoria } = req.query;

  let { rows } = await productoComponent.getProductosTodos(req);

  rows = rows
    .filter((p) => (idCategoria ? p.id_categoria === getID(idCategoria) : p))
    .filter((p) => (idMarca ? p.id_marca === getID(idMarca) : p));

  const body = rows.map((p, i) => [
    '',
    p.glosa,
    p.glosa_marca,
    p.descripcion,
    `${numberFormat(p.unidades_venta)}`,
    `${priceFormat(p.precio_detalle)}`,
    `${numberFormat(p.unidades_embalaje)}`,
    `${priceFormat(p.precio_embalaje)}`,
  ]);

  const imgs = rows.map((p, i) => {
    if (!p.datos_adicionales?.imgURL) return '';

    const basePath = `${process.env.BUCKETURI}/${process.env.BUCKETNAME}/`;
    return p.datos_adicionales?.imgURL.split(basePath)[1];
  });

  const imagenes = (await base.getImagenes(imgs)).sort((a, b) =>
    a.indice < b.indice ? -1 : 0
  );

  return { body, imagenes };
};

export const setHeaderProductos = async (doc) => {
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

export const addTableProductos = async (doc, req) => {
  const { body, imagenes } = await getTablaProductos(req);
  const { dataURI, width, height } = await base.getImageData(LOGO_PATH);

  doc.autoTable({
    head: [
      [
        'Imagen',
        'Nombre',
        'Marca',
        'Descripción',
        'Unidades Detalle',
        'Precio Detalle',
        'Unidades Embalaje',
        'Precio Embalaje',
      ],
    ],
    startY: MARGIN_HEADER, // solo primera página
    bodyStyles: { minCellHeight: 40, valign: 'middle' },
    columnStyles: {
      4: { halign: 'center' },
      5: { halign: 'right' },
      6: { halign: 'right' },
      7: { halign: 'right' },
    },
    body,
    didParseCell: (hookData) => {
      if (hookData.section === 'head') {
        hookData.cell.styles.valign = 'middle';
        if ([5, 6, 7].includes(hookData.column.dataKey)) {
          hookData.cell.styles.halign = 'right';
        }
        if ([4].includes(hookData.column.dataKey)) {
          hookData.cell.styles.halign = 'center';
        }
      }
    },
    didDrawPage: () => setWatermark(doc, { dataURI, width, height }),
    didDrawCell: ({ column, cell, row }) => {
      if (
        cell.section === 'body' &&
        column.index === 0 &&
        imagenes[row.index]?.width !== undefined
      ) {
        const { x, y } = cell;
        const dim = cell.height - cell.padding('vertical');
        const ss =
          (imagenes[row.index].width * dim) / imagenes[row.index].height;

        doc.addImage(
          imagenes[row.index].dataURI,
          'JPEG',
          x + cell.padding('horizontal') / 2,
          y + cell.padding('vertical') / 2,
          ss,
          dim,
          undefined,
          'FAST'
        );
      }
    },
  });
};

export const setFooterProductos = (doc) => {
  const pageCount = doc.internal.getNumberOfPages(); // Total Page Number
  for (let i = 0; i < pageCount; i++) {
    doc.setPage(i);
    let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; // Current Page
    doc.setFontSize(8);
    doc.text(
      `${pageCurrent} de ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 20,
      { align: 'center' }
    );
  }
};
