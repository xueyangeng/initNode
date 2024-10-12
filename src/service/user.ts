import bcrypt from 'bcrypt';
import { User } from '../model/user';
import { BaseService, Params } from './base';

class UserService extends BaseService {
  saltRounds = 10; // 密码加密强度

  error = (params: Params, description = '') => ({
    model: 'service.user',
    params,
    description,
  });

  // 创建一条记录
  create = async (params: User): Promise<User> => {
    const password = await bcrypt.hash(params.password, this.saltRounds);
    // 创建一个新的对象，包含加密后的密码
    const newUserParams = {
      ...params,
      password,
    } as User;
    const user = await User.create(newUserParams);
    delete user.password;
    return user;
  };

  get = async (id: string): Promise<User | null> => {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }
    delete user.password;
    return user;
  };

  query = async (params: User): Promise<User | null> => {
    // 动态构建查询条件
    const queryCondition: { phone?: string; email?: string } = {};

    if (params.phone) {
      queryCondition.phone = params.phone;
    } else if (params.email) {
      queryCondition.email = params.email;
    } else {
      return null; // 如果既没有phone也没有email，返回null
    }

    // 查询用户
    const foundUser = await User.findOne({ where: queryCondition });

    if (!foundUser) {
      return null; // 如果找不到用户，返回 null
    }

    // 使用 bcrypt.compare 来匹配明文密码和加密密码
    const isMatch = await bcrypt.compare(params.password, foundUser.password);

    if (!isMatch) {
      return null; // 如果密码不匹配，返回 null
    }
    delete foundUser.password;
    // 返回找到的用户
    return foundUser;
  };

  update = async (id: string, params: User): Promise<User | null> => {
    // 查找要更新的用户
    const foundUser = await User.findByPk(id);

    if (!foundUser) {
      return null; // 如果找不到用户，返回 null
    }

    // 更新字段，检查哪些字段存在并需要更新
    if (params.phone) {
      foundUser.phone = params.phone;
    }

    if (params.email) {
      foundUser.email = params.email;
    }

    if (params.nickname) {
      foundUser.nickname = params.nickname;
    }

    if (params.nickname) {
      foundUser.nickname = params.nickname;
    }

    // 如果提供了新的密码，对新密码进行加密
    if (params.password) {
      const hashedPassword = await bcrypt.hash(params.password, this.saltRounds);
      foundUser.password = hashedPassword; // 保存加密后的密码
    }

    // 保存更新后的用户信息
    await foundUser.save();

    delete foundUser.password;
    // 返回更新后的用户信息
    return foundUser;
  };

  login = async (phone: string, password: string): Promise<User | null> => {
    const foundUser = await this.query({ phone, password } as User);
    if (!foundUser) {
      return null; // 如果找不到用户，返回 null
    }
    // 如果提供了新的密码，对新密码进行加密
    if (!password) {
      return null; // 如果找不到用户，返回 null
    }
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return null; // 如果找不到用户，返回 null
    }
    // 返回更新后的用户信息
    return foundUser;
  };
}
export const userSvc = new UserService();
