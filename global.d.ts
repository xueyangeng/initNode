import Joi from 'joi';
import log4js from 'log4js';
import { config, errors } from './src/config/index';
import { User } from './src/model/user';

type Validate = (
  scheme: Joi.ObjectSchema<any>,
  data: any
) => Joi.ValidationResult;

declare module 'koa' {
  interface BaseContext {
    success: (data?: any) => void;
    fail: (key?: keyof Omit<typeof errors, 'SUCCESS'>, data?: any) => void;
    getLogger: (category?: string) => log4js.Logger;
    validate: Validate;
    config: typeof config;
    logger: log4js.Logger;
    requestId: string;
    user: User;
  }
}

declare const process: {
  env: {
    NODE_ENV: 'development' | 'testing' | 'production';
    [key: string]: any;
  };
};
