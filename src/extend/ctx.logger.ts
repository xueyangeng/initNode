import dayjs from 'dayjs';
import log4js from 'log4js';
import os from 'os';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name } = require('../../package.json');

const isDev = process.env.NODE_ENV === 'development';

const logDir = isDev
  ? path.resolve(__dirname, '../../runtime/logs')
  : '/data/logs/';

log4js.addLayout(
  'json',
  () => function (logEvent) {
    return JSON.stringify({
      ts: logEvent.startTime,
      host: os.hostname(),
      instance_id: logEvent.pid,
      level: logEvent.level.levelStr.toLowerCase(),
      app_id: name,
      source: logEvent.categoryName,
      ...logEvent.context,
      msg: logEvent.data.join(' '),
    });
  },
);

log4js.configure({
  appenders: {
    console: {
      type: 'console',
      layout: {
        type: 'json',
      },
    },
    info: {
      type: 'dateFile',
      pattern: '.hh',
      filename: path.join(
        logDir,
        `${name}/projlogs/${dayjs().format('YYYYMM')}/${dayjs().format(
          'DD',
        )}/access_${dayjs().format('HH')}.log`,
      ),
      layout: {
        type: 'json',
      },
    },
    error: {
      type: 'dateFile',
      level: 'error',
      pattern: '.hh',
      filename: path.join(
        logDir,
        `${name}/projlogs/${dayjs().format('YYYYMM')}/${dayjs().format(
          'DD',
        )}/error_${dayjs().format('HH')}.log`,
      ),
      // compress: true,
      layout: {
        type: 'json',
      },
    },
    fileFilter: {
      type: 'logLevelFilter',
      appender: 'error',
      level: 'ERROR',
    },
    http: {
      type: 'logLevelFilter',
      appender: isDev ? 'console' : 'info',
      level: 'trace',
      maxLevel: 'trace',
    },
  },
  categories: {
    default: {
      appenders: ['console', 'info', 'fileFilter'],
      level: 'all',
    },
  },
});

export const logger = log4js.getLogger(name);
export const { getLogger } = log4js;
