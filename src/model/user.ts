import {
  BeforeCreate,
  Column,
  DataType,
  Model as SequelizeModel,
  Table,
} from 'sequelize-typescript';
import guuid from '../lib/guuid';

@Table({
  comment: '用户表',
})
export class User extends SequelizeModel<User> {
  @BeforeCreate
  static autoId(m: User) {
    // eslint-disable-next-line no-param-reassign
    m.id = guuid();
  }

  @Column({
    primaryKey: true,
    type: DataType.BIGINT({ length: 20, unsigned: true }),
    comment: '主键ID',
  })
  id: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    defaultValue: '',
    comment: '昵称',
  })
  nickname: string;

  @Column({
    allowNull: false,
    unique: {
      name: 'uniq_phone',
      msg: '',
    },
    type: DataType.STRING(255),
    defaultValue: '',
    comment: '手机号',
  })
  phone: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    defaultValue: '',
    comment: '邮箱',
  })
  email: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    defaultValue: '',
    comment: '密码',
  })
  password: string;
}
