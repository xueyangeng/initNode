import {
  BeforeCreate,
  Column,
  DataType,
  Model as SequelizeModel,
  Table,
} from 'sequelize-typescript';
import guuid from '../lib/guuid';

@Table({
  comment: '导出任务表',
})
export class ExportTask extends SequelizeModel<ExportTask> {
  @BeforeCreate
  static autoId(m: ExportTask) {
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
    comment: '章节ID',
  })
  chapter_id: string;

  @Column({
    allowNull: false,
    type: DataType.TINYINT({ length: 2 }),
    defaultValue: 0,
    comment: '任务类型 0:素材包 1:分轨ZIP 2:OMF文件',
  })
  type: number;

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataType.FLOAT({ precision: 5, scale: 2 }),
    comment: '任务进度',
  })
  progress: number;

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataType.TINYINT({ length: 2 }),
    comment: '状态 0:未开始 1:异常错误 2:进行中 3:已完成',
  })
  status: number;

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataType.BIGINT({ length: 20, unsigned: true }),
    comment: '任务结果文件',
  })
  file_id: string;
}
