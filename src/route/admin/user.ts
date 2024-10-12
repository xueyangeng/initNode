import Router from '@koa/router';
import { Context } from 'koa';
import { Create, Update } from '../../request/admin/user';
import { userSvc } from '../../service/user';

const router = new Router();

/**
 * @api {post} /admin/users 创建用户
 * @apiGroup 后台管理
 * @apiExample Example-Body:
 * {
 *  "phone": "string",
 *  "nickname": "string",
 *  "password": "string",
 * }
 *
 * @apiParam (Request body) {String} body[phone]  用户手机号
 * @apiParam (Request body) {String} body[nickname]  用户昵称
 * @apiParam (Request body) {String} body[password]  用户密码
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
{
    "code": 0,
    "message": "",
    "data": {
        "id": "1442029661243375616",
        "nickname": "昵称",
        "phone": "手机号",
        "email": "邮箱",
        "created_at": "2022-02-02T12:57:42.873Z",
        "updated_at": "2022-02-02T12:57:48.384Z",
        "deleted_at": null
    }
}
 */
router.post('/users', async (ctx: Context) => {
  const { error, value } = Create.validate(ctx.request.body); // 使用 Joi 的 validate 方法
  if (error) {
    return ctx.fail('VALIDATE_ERROR', error.details); // error.details 包含具体的验证错误信息
  }
  const user = await userSvc.create(value);
  return ctx.success(user);
});

router.put('/users/:id', async (ctx: Context) => {
  const { error, value } = Update.validate(
    Object.assign(ctx.request.body, ctx.params)
  );
  if (error) {
    return ctx.fail('VALIDATE_ERROR', error.details);
  }
  const user = await userSvc.update(ctx.params.id, value);
  return ctx.success(user);
});

export const userRoutes = router.routes();
