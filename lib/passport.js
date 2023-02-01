import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { checkUser, findUser } from './user';
import { getID } from 'serverTools/utils/utiles';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_SECRET,
};

passport.use(
  new Strategy(opts, (user, done) => {
    try {
      user.id = getID(user.id);
      user.idNegocioActivo = getID(user.idNegocioActivo);
      user.negociosUsuario.forEach(
        (item) => (item.id_negocio = getID(item.id_negocio))
      );

      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  new LocalStrategy(function (username, password, done) {
    findUser({ username })
      .then(async (user) => {
        const salida = await checkUser(user, password);

        if (salida.usuario) {
          done(null, salida.usuario, { message: salida.message });
        } else {
          done(new Error(salida.message));
        }
      })
      .catch((error) => {
        done(error);
      });
  })
);

export default passport;
