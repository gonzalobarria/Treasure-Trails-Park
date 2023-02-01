let getFullTextSearch = (tabla, singular, campos) => {
  //   const tabla = 'usuarios';
  //   const singular = 'usuario';
  //   const campos = ['nombre', 'email', 'ap_paterno', 'ap_materno'];
  const importancia = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

  const q1 = `ALTER TABLE ${tabla} ADD COLUMN tsv_${singular}_text tsvector;\n`;

  const q2 = `CREATE INDEX tsv_${singular}_text_idx ON ${tabla} USING gin(tsv_${singular}_text);\n`;

  let weightOne = '';
  let weightTwo = '';
  campos.forEach((campo, index) => {
    weightOne += `setweight(to_tsvector(coalesce(${campo},'')), '${
      importancia[index]
    }')`;
    weightOne += index < campos.length - 1 ? ' || \n' : ';\n';

    weightTwo += `setweight(to_tsvector(coalesce(new.${campo},'')), '${
      importancia[index]
    }')`;
    weightTwo += index < campos.length - 1 ? ' || \n' : ';\n';
  });

  const q3 = `UPDATE ${tabla} SET tsv_${singular}_text = ${weightOne}\n`;

  const q4 = `CREATE FUNCTION ${singular}_text_search_trigger() RETURNS trigger AS $$
begin
  new.tsv_${singular}_text :=
${weightTwo}
return new;
end
$$ LANGUAGE plpgsql;\n`;

  const q5 = `CREATE TRIGGER tsvector_${singular}_text_update BEFORE INSERT OR UPDATE
ON ${tabla} FOR EACH ROW EXECUTE PROCEDURE ${singular}_text_search_trigger();`;

  return q1 + q2 + q3 + q4 + q5;
};

//const salida = getFullTextSearch('roles', 'rol', ['glosa']);
let salida = getFullTextSearch('usuarios', 'usuario', [
  'nombre',
  'email',
  'ap_paterno',
  'ap_materno'
]);

salida = getFullTextSearch('platos', 'plato', [
  'nombre',
  'descripcion'
]);
// consol.log(salida);


/*

--original

ALTER TABLE usuarios ADD COLUMN tsv_usuario_text tsvector;

CREATE INDEX tsv_usuario_text_idx ON usuarios USING gin(tsv_usuario_text);

UPDATE usuarios SET tsv_usuario_text = setweight(to_tsvector(coalesce(nombre,'')), 'A') 
|| setweight(to_tsvector(coalesce(email,'')), 'B')
|| setweight(to_tsvector(coalesce(ap_paterno,'')), 'C')
|| setweight(to_tsvector(coalesce(ap_materno,'')), 'D');

CREATE FUNCTION usuario_text_search_trigger() RETURNS trigger AS $$
begin
  new.tsv_usuario_text :=
    setweight(to_tsvector(coalesce(nombre,'')), 'A') ||
	setweight(to_tsvector(coalesce(email,'')), 'B') ||
	setweight(to_tsvector(coalesce(ap_paterno,'')), 'C') ||
	setweight(to_tsvector(coalesce(ap_materno,'')), 'D');
return new;
end
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvector_usuario_text_update BEFORE INSERT OR UPDATE
ON usuarios FOR EACH ROW EXECUTE PROCEDURE usuario_text_search_trigger();

*/
