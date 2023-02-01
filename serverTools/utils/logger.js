const { createLogger, format, transports } = require('winston');
const moment = require('moment-timezone');

const level = process.env.LOG_LEVEL || 'debug';

const formatParams = info => {
  let TZ = 'America/New_York'; //
  if (process.env.NODE_ENV !== 'production') TZ = 'Europe/Tirane';

  const { timestamp, level, message, ...args } = info;
  const newTZ = moment.tz(timestamp, TZ);

  const ts = newTZ
    .format()
    .slice(0, 19)
    .replace('T', ' ');

  return `${ts} ${level}: ${message} ${
    Object.keys(args).length ? JSON.stringify(args, '', '') : ''
  }`;
};

const developmentFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(formatParams)
);

const productionFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.printf(formatParams)
);

let logger;

if (process.env.NODE_ENV !== 'production') {
  logger = createLogger({
    level: level,
    format: developmentFormat,
    transports: [new transports.Console()]
  });
} else {
  logger = createLogger({
    level: level,
    format: productionFormat,
    transports: [new transports.Console()]
  });
}

module.exports = logger;
