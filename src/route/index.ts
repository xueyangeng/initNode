import Router from '@koa/router';
import { Context } from 'koa';
import admin from './admin';
import api from './api';
// import application from './application';

const router = new Router();

router.get('/ping', (ctx: Context) => ctx.success('ok'));

// router.get('/users', async (ctx: Context) => {
//   const user = await userService.create({
//     nickname: '213',
//     phone: '1233433333',
//     email: 'dcc2@XXX.COM',
//   } as User);
//   return ctx.success(wrapper(user));
// });

// router.use('/applications', ...application);
router.use('/api', ...api);
router.use('/admin', ...admin);

export const routes = router.routes();
