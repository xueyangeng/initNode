import {
  BeforeCreate,
  Column,
  DataType,
  Model as SequelizeModel,
  Table,
} from 'sequelize-typescript';
import guuid from '../lib/guuid';

@Table({
  comment: '语句表',
})
export class Sentence extends SequelizeModel<Sentence> {
  @BeforeCreate
  static autoId(m: Sentence) {
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
    defaultValue: '',
    type: DataType.TEXT({ length: 'long' }),
    comment: '语句内容',
  })
  content: string;

  @Column({
    allowNull: false,
    type: DataType.BIGINT({ length: 20, unsigned: true }),
    comment: '语句所属的角色',
  })
  role_id: string;

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataType.INTEGER({ length: 11 }),
    comment: '语句顺序',
  })
  order: number;
}
