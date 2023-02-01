import nextConnect from 'next-connect';
import usuariosDB from 'serverTools/db/usuarios';
import { creaTokenCC, errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

let validaCodigoCC = async (email, codigoRecuperacion) => {
  const fecha = new Date();
  let mensaje;

  try {
    const { rows } = await db.query(usuariosDB.getUsuarioByEmail(), [email]);
    let usuario = rows[0];

    if (usuario) {
      const expiro = fecha.getTime() > parseInt(usuario.codigo.expira);
      const codigoOK =
        parseInt(usuario.codigo.codigo) === parseInt(codigoRecuperacion);

      if (!expiro && codigoOK) {
        mensaje = {
          msg: 'Código validado',
          token: creaTokenCC(email, codigoRecuperacion),
        };
      } else {
        mensaje = {
          error: 'codigo incorrecto',
        };
      }
    }

    return mensaje;
  } catch (error) {
    throw error;
  }
};

handler.post(async (req, res) => {
  try {
    const salida = await validaCodigoCC(
      req.body.email,
      req.body.codigoRecuperacion
    );

    if (salida.error) {
      logger(req, salida.error);
    } else {
      logger(req);
    }

    res.json(salida);
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
