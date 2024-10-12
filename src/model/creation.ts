import {
  BeforeCreate,
  Column,
  DataType,
  Model as SequelizeModel,
  Table,
} from 'sequelize-typescript';
import guuid from '../lib/guuid';

@Table({
  comment: '创作表',
})
export class Creation extends SequelizeModel<Creation> {
  @BeforeCreate
  static autoId(m: Creation) {
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
    defaultValue: '',
    type: DataType.STRING(255),
    comment: '标题',
  })
  title: string;

  @Column({
    allowNull: false,
    defaultValue: '',
    type: DataType.STRING(255),
    comment: '描述',
  })
  description: string;

  @Column({
    allowNull: false,
    defaultValue: '',
    type: DataType.STRING(255),
    comment: '封面图',
  })
  cover: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT({ length: 20, unsigned: true }),
    comment: '文件实体ID',
  })
  file_id: string;

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataType.TINYINT({ length: 2 }),
    comment: '状态 0:未开始 1:异常错误 2:章节拆分中 3:拆分完成',
  })
  status: number;

  @Column({
    allowNull: false,
    type: DataType.BIGINT({ length: 20, unsigned: true }),
    comment: '创建者',
  })
  created_user_id: string;
}
