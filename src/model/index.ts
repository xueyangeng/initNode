import { Sequelize } from 'sequelize-typescript';
import { config } from '../config';
import { getLogger } from '../extend/ctx.logger';
import { Actor } from './actor';
import { Chapter } from './chapter';
import { Creation } from './creation';
import { CreationRole } from './creation_role';
import { DubbingTask } from './dubbing_task';
import { ExportTask } from './export_task';
import { File } from './file';
import { Sentence } from './sentence';
import { Track } from './track';
import { TrackItem } from './track_item';
import { User } from './user';
import { Voice } from './voice';

const logger = getLogger('Sequelize');

const sequelize = new Sequelize({
  ...config.sequelize,
  define: {
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
  dialectOptions: {
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
  logging(sql) {
    logger.info(sql);
  },
  logQueryParameters: true,
});

sequelize.addModels([
  User,
  File,
  ExportTask,
  DubbingTask,
  Track,
  TrackItem,
  Sentence,
  Chapter,
  Creation,
  CreationRole,
  Actor,
  Voice,
]);

// sequelize.sync({ alter: true });
