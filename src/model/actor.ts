import {
  BeforeCreate,
  Column,
  DataType,
  Model as SequelizeModel,
  Table,
} from 'sequelize-typescript';
import guuid from '../lib/guuid';

@Table({
  comment: '声优表',
})
export class Actor extends SequelizeModel<Actor> {
  @BeforeCreate
  static autoId(m: Actor) {
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
    type: DataType.STRING(255),
    comment: '物理UUID',
  })
  uuid: string;

  @Column({
    allowNull: false,
    defaultValue: '',
    type: DataType.STRING(255),
    comment: '名称',
  })
  name: string;

  @Column({
    allowNull: false,
    defaultValue: '',
    type: DataType.STRING(255),
    comment: '描述',
  })
  description: string;

  @Column({
    allowNull: true,
    defaultValue: '',
    type: DataType.STRING(255),
    comment: '头像',
  })
  avatar: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT({ length: 20, unsigned: true }),
    comment: '介绍音文件',
  })
  file_id: string;

  @Column({
    allowNull: false,
    type: DataType.JSON,
    comment: '标签',
  })
  tags: string[];
}
