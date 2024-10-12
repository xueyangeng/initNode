import { Context, Next } from 'koa';
import { keyGen, redis } from '../client/redis';
import { redisPrefix } from '../config';
import { userSvc } from '../service/user';

export const auth = function () {
  return async (ctx: Context, next: Next) => {
    const beer = ctx.request.headers.authorization;
    if (!beer) return ctx.fail('NOT_LOGIN');
    const token = ctx.request.headers.authorization.replace('Bearer ', '');
    const redisKey = keyGen(redisPrefix.login, token);
    const userID = await redis.get(redisKey);
    if (!userID) return ctx.fail('NOT_LOGIN');
    const user = await userSvc.get(userID);
    if (user) {
      ctx.user = user;
    }
    return next();
  };
};
