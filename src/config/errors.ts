const errors = {
  SUCCESS: [0, ''],
  NOT_FOUND: [404, '请求地址不存在'],
  SERVER_ERROR: [500, '服务器发生错误'],
  SYSTEM_ERROR: [1000, '服务器繁忙，请稍后再试'],
  VALIDATE_ERROR: [1001, '参数校验失败'],
  NOT_LOGIN: [1002, '您还没有登录'],
  FORBIDDEN: [1003, '没有操作权限'],

  LOGIN_FAILED: [2001, '登录失败'],
};

export default errors;
