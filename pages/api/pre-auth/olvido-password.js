import nextConnect from 'next-connect';
import usuarioComponent from 'serverTools/components/usuario';
import usuariosDB from 'serverTools/db/usuarios';
import { sendEmail } from 'serverTools/utils/emailSender';
import { ESTADOS_USUARIO } from 'serverTools/utils/enums';
import { errorDB, generaCodeOlvidoPassword, logger } from 'serverTools/utils/utiles';

const handler = nextConnect();

handler.patch(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await usuarioComponent.getUsuarioByEmail(email);

    if (user.id_estado === ESTADOS_USUARIO.ACTIVO) {
      const codigo = generaCodeOlvidoPassword();

      await db.query(usuariosDB.updCodigo(), [email, codigo]);
      
      const emailOptions = {
        userEmail: email,
        subject: 'Cambio de Contraseña',
        message: `Código para cambio de contraseña: ${codigo.codigo}`,
      };

      await sendEmail(emailOptions);

      logger(req);
      res.json({ message: 'Código de recuperación creado' });
    } else {
      const err = { error: 'No es posible cambiar la clave de este usuario' };
      logger(req, err);

      res.json(err);
    }
  } catch (error) {
    const err = errorDB(error);

    logger(req, err);
    res.status(400).send(err);
  }
});

export default handler;
