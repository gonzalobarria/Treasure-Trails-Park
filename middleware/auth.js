import nextConnect from 'next-connect';
import passport from 'lib/passport';
import { cors } from 'serverTools/utils/utiles';

const auth = nextConnect()
  .use(async (req, res, next) => {
    await cors(req, res);
    next();
  })
  .use(passport.authenticate('jwt', { session: false }));

export default auth;
