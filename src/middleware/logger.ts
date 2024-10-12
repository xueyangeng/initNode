import { Context, Next } from 'koa';
import { getLogger } from '../extend/ctx.logger';

const logger = getLogger('http');

export const syslog = function () {
  return async (ctx: Context, next: Next) => {
    const start = Date.now();
    logger.clearContext();
    logger.addContext('user_agent', ctx.request.header['user-agent']);
    logger.addContext('request_id', ctx.request.header.request_id);
    logger.addContext('page', ctx.request.url);
    logger.addContext('method', ctx.request.method);
    await next();
    logger.addContext('user', ctx.user ? ctx.user.id : 'unknow');
    const responseTime = Date.now() - start;
    logger.addContext('usetime', `${responseTime / 1000}s`);
    logger.info(JSON.stringify({ query: ctx.query, body: ctx.request.body }));
  };
};
