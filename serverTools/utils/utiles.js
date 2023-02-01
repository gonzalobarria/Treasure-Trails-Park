import sizeOf from 'image-size';
import fs from 'fs';
import momentTz from 'moment-timezone';
import initMiddleware from 'middleware/init-middleware';
import { TIMEZONE } from 'lib/constants';
const Cors = require('cors');
const randomize = require('randomatic');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loggerLib = require('./logger');
const Hashids = require('hashids');
const { ROLES } = require('../utils/enums');

const hashids = new Hashids(process.env.TOKEN_SECRET, 8, process.env.ALPHA);

const getNegocioActivo = (negociosUsuario) => {
  let idNegocio;

  if (negociosUsuario && negociosUsuario.length > 0) {
    if (negociosUsuario.length == 1) idNegocio = negociosUsuario[0].id_negocio;
  }

  return idNegocio;
};

const genToken = (usuario, negociosUsuario) => {
  try {
    return jwt.sign(
      {
        id: hashids.encode(usuario.id_usuario),
        nombre: `${usuario.nombre} ${usuario.ap_paterno}`,
        imgURL: usuario.datos_adicionales
          ? usuario.datos_adicionales.imgURL
          : '',
        idNegocioActivo: getNegocioActivo(negociosUsuario),
        negociosUsuario: negociosUsuario,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_SECRET_EXP }
    );
  } catch (error) {
    throw error;
  }
};

export const creaToken = (usuario, funcionalidadesUsuario) => {
  try {
    return genToken(usuario, armaFuncionalidades(funcionalidadesUsuario));
  } catch (error) {
    throw error;
  }
};

export const creaTokenCC = (email, codigo) => {
  try {
    return jwt.sign({ email, codigo }, process.env.TOKEN_SECRET, {
      expiresIn: 300,
    });
  } catch (error) {
    throw error;
  }
};

export const getTokenDecoded = (token) => {
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    throw err;
  }
};

export const verifyRefreshToken = (refreshToken) => {
  try {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw err;
  }
};

export const creaPasswordHashed = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw error;
  }
};

export const comparaPassword = async (password, usuario) => {
  try {
    return await bcrypt.compare(password, usuario.password);
  } catch (error) {
    throw error;
  }
};

export const corsOptionsDelegate = (req, callback) => {
  const whitelist = process.env.WHITELIST;
  let salida = { origin: false };

  // TODO: Ver bien el filtro para poder definir quien puede consultar en el sitio
  if (whitelist.indexOf(req.header('Deferer')) !== -1) {
    salida = { origin: req.header('Deferer') };
  }

  callback(null, salida);
};

export const errorDB = (error) => {
  return {
    errorDBCode: error.code,
    msg: error.message,
    detalle: error.detail,
  };
};

export const isAdmin = (req, res, next) => {
  const isAdministrador = req.user.rolActivo === ROLES.ADMINISTRADOR;

  if (!isAdministrador) {
    return res.status(401).send({ msg: 'Usuario no autorizado' });
  } else {
    return next();
  }
};

export const isProveedor = (req, res, next) => {
  const isProveedor = req.user.rolActivo === ROLES.PROVEEDOR;

  if (!isProveedor) {
    return res.status(401).send({ msg: 'Usuario no autorizado' });
  } else {
    return next();
  }
};

export const generaCodeOlvidoPassword = () => {
  try {
    const fecha = new Date();
    const sumarsesion = process.env.DURACION_CODE_TOKEN;
    let minutes = fecha.getMinutes();

    fecha.setMinutes(minutes + sumarsesion);

    const salida = {
      codigo: randomize('0', process.env.DIGITOS_CODE),
      expira: fecha.getTime(),
    };
    return salida;
  } catch (error) {
    throw error;
  }
};

export const getID = (id) => {
  try {
    if (id === '' || id === undefined) return null;

    return hashids.decode(id)[0];
  } catch (error) {
    throw error;
  }
};

export const actualizaToken = (id, rolIn, roles) => {
  try {
    const rolEncontrado = roles.find((rol) => rol.idRol === rolIn);
    let newToken = '';

    if (rolEncontrado) {
      newToken = genToken(id, rolIn);
    }

    return newToken;
  } catch (error) {
    throw error;
  }
};

export const logger = (req, error) => {
  try {
    const { method, query, user } = req;
    let { body } = req;
    let id, idUsuario;
    const url = req.originalUrl || req.url;

    if (user) {
      id = user.id;
      idUsuario = user.id_usuario;
    }

    if (body && method === 'POST') {
      body.password = undefined;
      body.email = undefined;
      body.pass01 = undefined;
      body.pass02 = undefined;
    }

    if (error?.info) error = undefined;

    const params =
      method !== 'GET'
        ? { id, idUsuario, method, error, body }
        : { id, method, query, error };

    if (!error) {
      loggerLib.info(url + ' |', params);
    } else {
      loggerLib.error(url + ' |', params);
    }
  } catch (error) {
    throw error;
  }
};

export const loggerInfo = (info) => {
  try {
    loggerLib.info(info);
  } catch (error) {
    throw error;
  }
};

export const encodeId = (id) => {
  if (id) return hashids.encode(id);
};

export const checkParametros = (obj) => {
  for (let prop in obj) {
    if (obj[prop] === undefined) throw { message: 'parametros mal enviados' };
  }
};

const armaFuncionalidades = (rows) => {
  let salidaArray = [];
  let salida = {};

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  const pueblaElementoSalida = (salida, el) => {
    salida.id_negocio = hashids.encode(el.id_negocio);
    salida.id_division = el.id_division;
    salida.glosa = el.glosa;
    salida.glosa_division = el.glosa_division;
    salida.func = [el.id_funcionalidad];
    salida.almacenes =
      el.id_almacen === 0 ? [] : [hashids.encode(el.id_almacen)];
  };

  rows.forEach((element) => {
    if (isEmpty(salida)) {
      pueblaElementoSalida(salida, element);
    } else {
      if (
        salida.id_negocio === hashids.encode(element.id_negocio) &&
        salida.id_division === element.id_division
      ) {
        const exF = salida.func.filter((p) => p === element.id_funcionalidad);
        if (exF.length === 0) salida.func.push(element.id_funcionalidad);

        if (element.id_almacen !== 0) {
          salida.almacenes.push({
            func: element.id_funcionalidad,
            id_almacen: hashids.encode(element.id_almacen),
          });
        }
      } else {
        salidaArray.push(salida);
        salida = {};
        pueblaElementoSalida(salida, element);
      }
    }
  });

  if (rows.length > 0) salidaArray.push(salida);
  return salidaArray;
};

export const limpiaString = (texto) => {
  let salida = '';

  try {
    if (typeof texto === 'string') {
      salida = String(texto).trim();
    } else {
      throw new Error('Valor debe ser string');
    }
  } catch (error) {
    throw error;
  }

  return salida;
};

export const preparaNumero = (num) => (typeof num === 'number' ? num : 0);

const generateToken = (object, TS, TSE) => {
  try {
    return jwt.sign(object, TS, { expiresIn: TSE });
  } catch (error) {
    throw error;
  }
};

export const createRefreshToken = (object) => {
  try {
    return generateToken(
      { ...object, type: 'refresh' },
      process.env.REFRESH_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_SECRET_EXP
    );
  } catch (error) {
    throw error;
  }
};

export const cors = initMiddleware(Cors({ origin: process.env.VALID_ORIGIN }));

export const preQueryData = (query) => {
  const currentPage = query?.currentPage ?? 1;
  const pageSize = query?.pageSize ?? 8;
  const orderBy = query?.orderBy ?? 1;
  const search = query?.search ?? undefined;

  const offset = pageSize * (currentPage - 1);

  return { currentPage, pageSize, offset, orderBy, search };
};

export const postDataPaginada = (preData, data) => {
  const totalItem = data[0]?.total ?? 0;
  const totalPage = Math.ceil(totalItem / preData.pageSize);

  return {
    currentPage: preData.currentPage,
    pageSize: preData.pageSize,
    search: preData.search !== undefined,
    totalItem,
    totalPage,
    data,
  };
};

export const getTimestampNow = () =>
  momentTz.tz(momentTz().format(), TIMEZONE).unix();

export const sendErrorFE = ({ req, res, error, code = 400 }) => {
  try {
    const err = errorDB(error);

    logger(req, err);
    res.status(code).send(err);
  } catch (error) {
    res.status(code).send({ msg: 'error grave' });
  }
};

export const priceFormat = (value) => {
  if (!value) return '$0';

  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(value);
};

export const numberFormat = (value) => {
  if (!value || Number.isNaN(value)) return 0;

  return new Intl.NumberFormat('es-CL').format(value);
};

const base64EncodeSrcFile = (src) =>
  Buffer.from(fs.readFileSync(src)).toString('base64');

export const getImageData = (src) => {
  const base64Img = base64EncodeSrcFile(src);
  const imgData = `data:image/jpeg;base64,${base64Img}`;
  const img = Buffer.from(base64Img, 'base64');
  const { width, height } = sizeOf(img);

  return { imgData, width, height };
};
