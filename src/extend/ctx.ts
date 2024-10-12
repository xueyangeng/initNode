import Joi from 'joi';
import { Context, Next } from 'koa';
import * as uuid from 'uuid';
import { config, errors } from '../config/index';
import { getLogger, logger } from './ctx.logger';

export const context = async function context(ctx: Context, next: Next) {
  ctx.logger = logger;
  ctx.getLogger = getLogger;
  ctx.success = function success(data: any = {}) {
    ctx.body = {
      code: errors.SUCCESS[0],
      message: errors.SUCCESS[1],
      data,
    };
  };
  ctx.fail = function fail(key = 'SYSTEM_ERROR', data: any = '') {
    const error = errors[key];
    ctx.body = {
      code: error[0],
      message: error[1],
      data,
    };
  };
  ctx.config = config;
  ctx.requestId = (ctx.header['x-requested-id'] as string) || uuid.v4();
  ctx.validate = function validate(scheme: Joi.ObjectSchema<any>, data: any) {
    return scheme.validate(data);
  };
  await next();
};
