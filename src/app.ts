import Koa from 'koa';
import koaBody from 'koa-body';
import bodyParser from 'koa-bodyparser';
import mount from 'koa-mount';
import serve from 'koa-static';
import cors from 'koa2-cors';
import path from 'path';
import { config } from './config';
import { logger } from './extend/ctx.logger';
import { context, helper } from './extend/index';
import { auth } from './middleware/auth';
import exception from './middleware/exception';
import { syslog } from './middleware/logger';
import './model/index';
import { routes } from './route';

const app = new Koa();

if (process.env.NODE_ENV !== 'production') {
  app.use(mount('/doc', serve(path.join(__dirname, '../doc'))));
}

app.use(cors(config.corsOptions)); // 跨域
app.use(bodyParser()); // 解析body
app.use(koaBody({ multipart: true })); // 解析文件
app.use(context); // 扩充ctx
app.use(helper); // 扩充ctx
app.use(syslog()); // 系统默认请求log
// app.use(auth()); // 登录验证
app.use(routes); // 路由
app.use(exception); // 默认出错

app.listen(config.port, () => {
  logger.info(`Server running at http://127.0.0.1:${config.port}`);
  logger.info(`Environment: ${process.env.NODE_ENV}`);
});
