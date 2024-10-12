import { Context, Next } from 'koa';

export const helper = async function (ctx: Context, next: Next) {
  ctx.helper = {
    /**
     * 业务Key生成器。
     * @param biz 业务标识
     * @example
     * ```javascript
     * keyGenerator('业务')('标识')
     * // '业务|标识
     * ```
     */

    keyGenerator(biz: string) {
      return (key: string): string => `${biz}|${key}`;
    },
    /**
     * 随机验证码生成器，可指定长度
     * @param len 长度
     * @param seed 随机字符种子库，默认为数字'0-9'
     */

    captchaGenerator(len = 6, seed = '0123456789'): string {
      return new Array(len)
        .fill('')
        .map(() => seed.charAt(Math.floor(Math.random() * seed.length)))
        .join('');
    },
  };
  await next();
};
