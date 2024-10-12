import {
  BeforeCreate,
  Column,
  DataType,
  Model as SequelizeModel,
  Table,
} from 'sequelize-typescript';
import guuid from '../lib/guuid';
export interface OriginalContentSetting {
  text: string;
  id: string;
  clips: {
    text: string
    id: string
  }[];
}
@Table({
  comment: '章节表',
})
export class Chapter extends SequelizeModel<Chapter> {
  @BeforeCreate
  static autoId(m: Chapter) {
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
    comment: '章节标题',
  })
  title: string;

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataType.INTEGER({ length: 11 }),
    comment: '章节排序',
  })
  order: number;

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataType.TEXT({ length: 'long' }),
    comment:
      '原始内容',
  })
  content: OriginalContentSetting[];

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataType.TINYINT({ length: 2 }),
    comment:
      '状态 0:未开始 1:异常错误 2:智能体识别中 3:校对中 4:配音中 5:已完成',
  })
  status: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT({ length: 20, unsigned: true }),
    comment: '锁定者',
  })
  locked_user_id: string;
}
