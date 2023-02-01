import nextConnect from 'next-connect';
import { cors } from 'serverTools/utils/utiles';

const noAuth = nextConnect().use(async (req, res, next) => {
  await cors(req, res);

  next();
});

export default noAuth;
