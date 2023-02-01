/**
 * Actualiza el código de recuperación de clave
 *
 * @author Gonzalo Barría
 */

export const updCodigo = () => {
  return `
    UPDATE usuarios 
      set codigo=$2 
    WHERE email=$1
  `;
};
