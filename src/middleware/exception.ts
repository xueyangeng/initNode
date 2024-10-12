import { Context, Next } from 'koa';

export default async function (ctx: Context, next: Next) {
  if (ctx.response.status === 404) return ctx.fail('NOT_FOUND');
  if (ctx.response.status === 500) return ctx.fail('SERVER_ERROR');
  try {
    return await next();
  } catch (e) {
    ctx.logger.error('System Error:', e);
    return ctx.fail('SYSTEM_ERROR', e);
  }
}
