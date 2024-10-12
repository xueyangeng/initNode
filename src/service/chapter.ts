import { Chapter } from '../model/chapter';
import { BaseService, Params } from './base';

export class ChapterService extends BaseService {
    error = (params: Params, description = '') => ({
        model: 'chapter',
        params,
        description,
    });

    // 创建一条记录
    create = async (params: Chapter): Promise<Chapter> => Chapter.create(params);

    // 查询一条记录
    findOne = async (params: Params): Promise<Chapter> => Chapter.findOne({
        where: params
    });

    // 查询所有记录
    findAll = async (params: Params, attributes?: string[]): Promise<Chapter[]> => Chapter.findAll({
        where: params,
        order: [['order', 'ASC']],
        attributes
    });
}

export const chapterSvc = new ChapterService();