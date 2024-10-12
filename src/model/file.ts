import {
  BeforeCreate,
  Column,
  DataType,
  Model as SequelizeModel,
  Table,
} from 'sequelize-typescript';
import guuid from '../lib/guuid';

@Table({
  comment: '文件表',
})
export class File extends SequelizeModel<File> {
  @BeforeCreate
  static autoId(m: File) {
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
    comment: '文件名称',
  })
  title: string;

  @Column({
    allowNull: false,
    defaultValue: '',
    type: DataType.STRING(255),
    comment: '文件路径',
  })
  src: string;

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataType.TINYINT({ length: 2 }),
    comment: '文件类型 0:other 1:dubbing 2:music 3:effect 4:zip 5:txt',
  })
  type: string;

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataType.INTEGER({ unsigned: true }),
    comment: '文件大小',
  })
  size: number;

  @Column({
    allowNull: false,
    type: DataType.JSON,
    comment: '标签',
  })
  tags: string[];

  @Column({
    allowNull: false,
    type: DataType.JSON,
    comment: '元数据',
  })
  metadata: Record<string, any>;
}
