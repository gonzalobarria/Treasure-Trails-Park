import db from '../db';
import negocios from '../db/negocios';
import utiles from '../utils/utiles';

export const insNegocio = async (body) => {
  const {
    rutNegocio,
    idDivision,
    glosa,
    glosaDivision,
    datosAdicionales,
    idRegion,
    idComuna,
    idCiudad,
    idEstado,
  } = body;

  try {
    utiles.checkParametros({
      rutNegocio,
      idDivision,
      glosa,
      glosaDivision,
      datosAdicionales,
      idRegion,
      idComuna,
      idCiudad,
      idEstado,
    });

    const { rows } = await db.query(negocios.insNegocio(), [
      rutNegocio,
      idDivision,
      glosa,
      glosaDivision,
      datosAdicionales,
      idRegion,
      idComuna,
      idCiudad,
      idEstado,
    ]);

    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const getNegocios = async () => {
  try {
    const { rows } = await db.query(negocios.getNegocios(), []);

    rows.forEach((negocio) => {
      negocio.id_negocio = utiles.encodeId(negocio.id_negocio);
    });

    return { rows };
  } catch (error) {
    throw error;
  }
};

export const getNegociosActivos = async () => {
  try {
    const { rows } = await db.query(negocios.getNegociosActivos(), []);

    rows.forEach((negocio) => {
      negocio.id_negocio = utiles.encodeId(negocio.id_negocio);
    });

    return { rows };
  } catch (error) {
    throw error;
  }
};

export const getNegocio = async (idNegocio) => {
  try {
    const { rows } = await db.query(negocios.getNegocio(), [idNegocio]);

    rows.forEach((negocio) => {
      negocio.id_negocio = utiles.encodeId(negocio.id_negocio);
    });

    return { rows };
  } catch (error) {
    throw error;
  }
};

export const updEstadoNegocio = async (idNegocio, body) => {
  const { idEstado } = body;

  try {
    utiles.checkParametros({ idEstado });

    const { rowCount } = await db.query(negocios.updEstadoNegocio(), [
      idNegocio,
      idEstado,
    ]);

    return { rowCount };
  } catch (error) {
    throw error;
  }
};

export const updNegocio = async (idNegocio, body) => {
  const {
    rutNegocio,
    idDivision,
    glosa,
    glosaDivision,
    datosAdicionales,
    idRegion,
    idComuna,
    idCiudad,
    idEstado,
  } = body;

  try {
    utiles.checkParametros({
      rutNegocio,
      idDivision,
      glosa,
      glosaDivision,
      datosAdicionales,
      idRegion,
      idComuna,
      idCiudad,
      idEstado,
    });

    const { rowCount } = await db.query(negocios.updNegocio(), [
      idNegocio,
      rutNegocio,
      idDivision,
      glosa,
      glosaDivision,
      datosAdicionales,
      idRegion,
      idComuna,
      idCiudad,
      idEstado,
    ]);

    return { rowCount };
  } catch (error) {
    throw error;
  }
};

const negocioComponent = {
  insNegocio,
  getNegocios,
  getNegociosActivos,
  getNegocio,
  updEstadoNegocio,
  updNegocio,
};

export default negocioComponent;
