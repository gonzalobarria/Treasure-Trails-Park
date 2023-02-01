import nextConnect from 'next-connect';
import passport from 'lib/passport';
import usuarioComponent from 'serverTools/components/usuario';
import noAuth from 'middleware/no-auth';
import { creaToken, errorDB, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler
  .use(noAuth)
  .post(
    passport.authenticate('local', { session: false }),
    async (req, res) => {
      try {
        const usuario = req.user;

        if (!usuario) throw Error('Posible Error de Parametros');

        try {
          const funcionalidadesUsuario =
            await usuarioComponent.getFuncionalidesUsuario(usuario.id_usuario);

          const token = creaToken(usuario, funcionalidadesUsuario.rows);
          const refreshToken = await usuarioComponent.updateRefreshToken(
            usuario
          );
          const datos = {
            nombre: usuario.nombre,
            ap_paterno: usuario.ap_paterno,
            ap_materno: usuario.ap_materno,
            datos_adicionales: usuario.datos_adicionales,
          };

          logger(req);
          return res.json({ token, datos, refreshToken });
        } catch (error) {
          const err = errorDB(error);

          logger(req, err);
          throw error;
        }
      } catch (error) {
        console.error(error);
        res.status(401).send(error.message);
      }
    }
  );

export default handler;
