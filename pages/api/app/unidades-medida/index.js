import auth from 'middleware/auth';
import nextConnect from 'next-connect';
import unidadMedidaComponent from 'serverTools/components/unidades_medida';
import { errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  try {
    const unidadesMedida = await unidadMedidaComponent.getUnidadesMedida(req);

    logger(req);
    res.json(unidadesMedida);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});
// .post(async (req, res) => {
//   try {
//     const marca = await marcaComponent.checkMarca(req);
//     if (marca.rowCount === 0) {
//       await marcaComponent.insMarca(req.body);
//     }

//     const marcas = await marcaComponent.getMarcas(req.query);
//     if (marca.rowCount > 0) {
//       marcas.errorMsg = 'error.marca-duplicada';
//     }

//     logger(req);
//     res.send(marcas);
//   } catch (error) {
//     const err = errorDB(error);

//     logger(req, err);
//     res.status(400).send(err);
//   }
// });

export default handler;
