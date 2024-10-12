import Router from '@koa/router';
import { Context } from 'koa';
import { nanoid } from 'nanoid';
import { keyGen, redis } from '../../client/redis';
import { redisPrefix, ttls } from '../../config';
import { auth } from '../../middleware/auth';
import { Login } from '../../request/api/user';
import { userSvc } from '../../service/user';

const router = new Router();

router.get('/users/me', auth(), async (ctx: Context) => ctx.success(ctx.user));

router.post('/users/login', async (ctx: Context) => {
  const { error, value } = Login.validate(ctx.request.body); // 使用 Joi 的 validate 方法
  if (error) {
    return ctx.fail('VALIDATE_ERROR', error.details); // error.details 包含具体的验证错误信息
  }
  const user = await userSvc.query(value);
  if (!user) {
    return ctx.fail('LOGIN_FAILED');
  }
  const token = nanoid(32);
  const redisKey = keyGen(redisPrefix.login, token);
  redis.set(redisKey, user.id, 'EX', ttls.week);

  return ctx.success({ token, user });
});

export const userRoutes = router.routes();
