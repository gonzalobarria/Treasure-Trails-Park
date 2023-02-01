import nextConnect from 'next-connect';
import noAuth from 'middleware/no-auth';
import usuarioComponent from 'serverTools/components/usuario';
import {
  creaToken,
  errorDB,
  getID,
  logger,
  verifyRefreshToken,
} from 'serverTools/utils/utiles';

const handler = nextConnect();

const validateRefreshToken = async (req, refreshToken) => {
  if (refreshToken?.length > 0) {
    try {
      const idUsuario = getID(verifyRefreshToken(refreshToken).id);

      const usuario = await usuarioComponent.getUsuario(idUsuario);

      const a = usuario?.refresh_token?.filter((rt) => rt === refreshToken);

      if (a.length === 0) {
        throw {
          code: 300,
          type: 'refreshTokenInvalid',
          message: 'Refresh Token no encontrado',
        };
      }

      usuario.refresh_token = usuario.refresh_token.filter(
        (rt) => rt !== refreshToken
      );

      return { usuario, message: '' };
    } catch (error) {
      throw error;
    }
  } else {
    const err = { idUsuario, message: 'There is no refresh token to check.' };
    throw err;
  }
};

handler.use(noAuth).post(async (req, res) => {
  let { refreshToken } = req.body;

  try {
    const { usuario } = await validateRefreshToken(req, refreshToken);

    const { rows: funcionalidadesUsuario } =
      await usuarioComponent.getFuncionalidesUsuario(usuario.id_usuario);

    const token = creaToken(usuario, funcionalidadesUsuario);

    refreshToken = await usuarioComponent.updateRefreshToken(usuario);

    const msg = {
      idUsuario: usuario.id_usuario,
      message: 'Nuevo Refresh Token generado con éxito',
      info: true,
    };

    logger(req, msg);
    res.json({ token, refreshToken });
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(420).send(error);
  }
});

export default handler;
