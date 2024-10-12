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
  comment: '轨道表',
})
export class Track extends SequelizeModel<Track> {
  @BeforeCreate
  static autoId(m: Track) {
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
    allowNull: true,
    defaultValue: '',
    type: DataType.STRING(255),
    comment: '轨道名称',
  })
  title: string;

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataType.TINYINT({ length: 2 }),
    comment: '类型 0:root 1: dubbing 2: music 3: effect',
  })
  type: number;

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataType.INTEGER({ length: 11 }),
    comment: '轨道顺序',
  })
  order: number;

  @Column({
    allowNull: false,
    defaultValue: {},
    type: DataType.JSON,
    comment: '设置',
  })
  setting: TrackSetting;
}
