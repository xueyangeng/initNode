import Router from '@koa/router';
import { Context } from 'koa';
import { Creation } from '../../request/api/creation';
import { creationSvc } from '../../service/creation';

const router = new Router();
// eslint-disable-next-line consistent-return
router.get('/creations', async (ctx: Context) => {
  const { error, value } = Creation.validate(ctx.query); // 使用 Joi 的 validate 方法
  if (error) {
    return ctx.fail('VALIDATE_ERROR', error.details); // error.details 包含具体的验证错误信息
  }
  const result = await creationSvc.get(value);
  return ctx.success(result);
});

export const creationRoutes = router.routes();
