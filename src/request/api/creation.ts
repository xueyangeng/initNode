import Joi from 'joi';

export const Creation = Joi.object({
  size: Joi.string()
    .pattern(/^[0-9]+$/) // 验证 phone 只包含数字
    .required() // 必填字段
    .messages({
      'string.pattern.base': '只能包含数字',
      'any.required': 'size是必填项',
    }),
  page: Joi.string()
    .pattern(/^[0-9]+$/) // 验证 phone 只包含数字
    .required() // 必填字段
    .messages({
      'string.pattern.base': '只能包含数字',
      'any.required': 'page是必填项',
    }),
});
