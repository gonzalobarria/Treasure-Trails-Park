import usuarioComponent from 'serverTools/components/usuario';
import { ESTADOS_USUARIO, TIPOS_INGRESO } from 'serverTools/utils/enums';
import { comparaPassword } from 'serverTools/utils/utiles';

export const findUser = async ({ username }) =>
  await usuarioComponent.getUsuarioByEmail(username);

export const checkUser = async (usuario, password) => {
  try {
    if (!usuario) {
      return {
        message: 'Usuario o Password Incorrecto',
      };
    }

    if (usuario.id_tipo_ingreso !== TIPOS_INGRESO.CONCLAVE) {
      return {
        message: 'No corresponde la manera de loguearse',
        tipo_ingreso: usuario.id_tipo_ingreso,
      };
    }

    if (usuario.id_estado !== ESTADOS_USUARIO.ACTIVO) {
      return {
        message: 'Usuario no se encuentra activo',
        id_estado: usuario.id_estado,
      };
    }

    const verificado = await comparaPassword(password, usuario);

    if (!verificado) {
      return {
        message: 'Usuario o Password Incorrecto',
      };
    }

    return { usuario, message: 'Ingreso Exitoso' };
  } catch (error) {
    return { error };
  }
};
