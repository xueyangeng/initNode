import { RedisOptions } from 'ioredis';
import cors from 'koa2-cors';
import { SequelizeOptions } from 'sequelize-typescript';

const sequelize: SequelizeOptions = {
  database: 'dayan',
  host: '192.168.100.16',
  port: 3306,
  dialect: 'mysql',
  username: 'root',
  password: '1',
};

const redisOpt: RedisOptions = {
  host: '192.168.100.16',
  port: 6379,
  db: 0,
  password: '',
};

const corsOptions: cors.Options = {
  origin: '*',
};

export default {
  port: 3333,
  sequelize,
  redisOpt,
  corsOptions,
};
