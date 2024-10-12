import Joi from 'joi';

export const Login = Joi.object({
  phone: Joi.string()
    .pattern(/^[0-9]+$/) // 验证 phone 只包含数字
    .min(10) // 最小长度为10位
    .max(15) // 最大长度为15位
    .required() // 必填字段
    .messages({
      'string.pattern.base': '手机号只能包含数字',
      'string.min': '手机号至少需要 10 位数字',
      'string.max': '手机号不能超过 15 位数字',
      'any.required': '手机号是必填项',
    }),

  password: Joi.string()
    .min(8) // 密码至少8位
    .max(30) // 密码最多30位
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')) // 至少包含字母和数字
    .required() // 必填字段
    .messages({
      'string.pattern.base': '密码只能包含字母和数字',
      'string.min': '密码至少需要 8 位字符',
      'string.max': '密码不能超过 30 位字符',
      'any.required': '密码是必填项',
    }),
});
