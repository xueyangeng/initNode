import {
  BeforeCreate,
  Column,
  DataType,
  Model as SequelizeModel,
  Table,
} from 'sequelize-typescript';
import guuid from '../lib/guuid';

@Table({
  comment: '音色表',
})
export class Voice extends SequelizeModel<Voice> {
  @BeforeCreate
  static autoId(m: Voice) {
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
    type: DataType.BIGINT({ length: 20, unsigned: true }),
    comment: '声优ID',
  })
  actor_id: string;

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
    defaultValue: [],
    type: DataType.JSON,
    comment: 'VAD [(00-99)*3]',
  })
  vad: number[];

  @Column({
    allowNull: false,
    type: DataType.BIGINT({ length: 20, unsigned: true }),
    comment: '演示音频文件',
  })
  file_id: string;

  @Column({
    allowNull: false,
    type: DataType.TEXT({ length: 'long' }),
    comment: '演示音频文本',
  })
  asr: string;

  @Column({
    allowNull: false,
    type: DataType.JSON,
    comment: '标签',
  })
  tags: string[];

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataType.INTEGER({ length: 11 }),
    comment: '排序',
  })
  order: number;
}
