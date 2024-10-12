import Joi from 'joi';

export const Create = Joi.object({
  nickname: Joi.string()
    .min(2) // 昵称至少2位
    .max(20) // 昵称最多20位
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/) // 验证 phone 只包含数字
    .min(10) // 最小长度为10位
    .max(15) // 最大长度为15位
    .required(), // 必填字段
  password: Joi.string()
    .min(8) // 密码至少8位
    .max(30) // 密码最多30位
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')) // 至少包含字母和数字
    .required(), // 必填字段
});

export const Update = Joi.object({
  id: Joi.string().required(),
  nickname: Joi.string()
    .min(2) // 昵称至少2位
    .max(20), // 昵称最多20位
  phone: Joi.string()
    .pattern(/^[0-9]+$/) // 验证 phone 只包含数字
    .min(10) // 最小长度为10位
    .max(15), // 最大长度为15位
  password: Joi.string()
    .min(8) // 密码至少8位
    .max(30) // 密码最多30位
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')), // 至少包含字母和数字
});
