import nextConnect from 'next-connect';
import usuarioComponent from 'serverTools/components/usuario';
import usuariosDB from 'serverTools/db/usuarios';
import {
  creaPasswordHashed,
  creaTokenCC,
  errorDB,
  getTokenDecoded,
  logger,
} from 'serverTools/utils/utiles';

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

handler.patch(async (req, res) => {
  const { pass01, pass02, token } = req.body;

  try {
    if (pass01 !== pass02) {
      res.status(400).send({ message: 'Claves no coinciden' });
    } else {
      const user = getTokenDecoded(token);
      const hashedPassword = await creaPasswordHashed(pass01);
      const mensaje = await validaCodigoCC(user.email, user.codigo);

      if (!mensaje.errorDBCode && !mensaje.error) {
        const usuarioTmp = await usuarioComponent.updPasswordUsuario(
          user.email,
          hashedPassword
        );

        logger(req);
        res.json(usuarioTmp);
      } else {
        res.status(400).send(mensaje);
      }
    }
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
