import {
  BeforeCreate,
  Column,
  DataType,
  Model as SequelizeModel,
  Table,
} from 'sequelize-typescript';
import guuid from '../lib/guuid';

export interface DubbingParams {
  version: number;
  vad: number[];
  tags: string[];
  seed: string;
  voice_id: string;
}

@Table({
  comment: '配音任务表',
})
export class DubbingTask extends SequelizeModel<DubbingTask> {
  @BeforeCreate
  static autoId(m: DubbingTask) {
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
    comment: '语句ID',
  })
  sentence_id: string;

  @Column({
    allowNull: false,
    type: DataType.JSON,
    comment: '任务参数',
  })
  params: DubbingParams;

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
    comment: '状态 0:不活跃 1:活跃',
  })
  activity: boolean;

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
