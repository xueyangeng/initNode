import {
  BeforeCreate,
  Column,
  DataType,
  Model as SequelizeModel,
  Table,
} from 'sequelize-typescript';
import guuid from '../lib/guuid';

export interface TrackSetting {
  volumn: number;
  mute: boolean;
  rate: number;
  fade_in: number;
  fade_out: number;
}

@Table({
  comment: '轨道项表',
})
export class TrackItem extends SequelizeModel<TrackItem> {
  @BeforeCreate
  static autoId(m: TrackItem) {
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
    comment: '轨道ID',
  })
  track_id: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT({ length: 20, unsigned: true }),
    comment: '语句ID',
  })
  sentence_id: string;

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataType.INTEGER,
    comment: '开始时间',
  })
  start: number;

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataType.INTEGER({ length: 11 }),
    comment: '停顿时间，后间隔',
  })
  gap: number;

  @Column({
    allowNull: false,
    defaultValue: {},
    type: DataType.JSON,
    comment: '设置',
  })
  setting: TrackSetting;

  @Column({
    allowNull: true,
    type: DataType.BIGINT({ length: 20, unsigned: true }),
    comment: '文件实体ID',
  })
  file_id: string;
}
