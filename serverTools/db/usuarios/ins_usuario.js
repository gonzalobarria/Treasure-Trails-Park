/**
 * Agrega un usuario a la tabla Usuarios
 * 
 * @author Gonzalo Barría
 */

export const insUsuario = () => {
  return `
    INSERT INTO usuarios (
      nombre,
      ap_paterno,
      ap_materno,
      email,
      id_tipo_ingreso,
      id_estado
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id_usuario
`;
};
