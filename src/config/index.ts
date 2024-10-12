import defaultConf from './config.default';
import devConf from './config.development';
import prodConf from './config.production';
import testConf from './config.testing';
import errors from './errors';

type Config = typeof defaultConf &
  typeof devConf &
  typeof testConf &
  typeof prodConf;

const config = { ...defaultConf } as Config;
switch (process.env.NODE_ENV) {
  case 'testing':
    Object.assign(config, { ...testConf });
    break;
  case 'production':
    Object.assign(config, { ...prodConf });
    break;
  default:
    Object.assign(config, { ...devConf });
}

export { config, errors };

export const ttls = {
  week: 7 * 24 * 60 * 60,
  day: 24 * 60 * 60,
  fiveMin: 5 * 60,
};

export const redisPrefix = {
  login: 'login',
};
