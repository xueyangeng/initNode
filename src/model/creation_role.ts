import {
  BeforeCreate,
  Column,
  DataType,
  Model as SequelizeModel,
  Table,
} from 'sequelize-typescript';
import guuid from '../lib/guuid';

@Table({
  comment: '创作角色表',
})
export class CreationRole extends SequelizeModel<CreationRole> {
  @BeforeCreate
  static autoId(m: CreationRole) {
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
    allowNull: false,
    type: DataType.BIGINT({ length: 20, unsigned: true }),
    comment: '创作ID',
  })
  creation_id: string;

  @Column({
    allowNull: false,
    defaultValue: '',
    type: DataType.STRING(255),
    comment: '角色名称',
  })
  name: string;

  @Column({
    allowNull: false,
    defaultValue: '',
    type: DataType.STRING(255),
    comment: '角色头像',
  })
  avatar: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT({ length: 20, unsigned: true }),
    comment: '声优ID',
  })
  actor_id: string;
}
