import { Creation } from '../model/creation';
import { BaseService, Params } from './base';
export enum CreationStatus  {
  CREATED = 0,
  ERROR = 1,
  PROCESSING = 2,
  SUCCESS = 3,
}
class CreationService extends BaseService {
  error = (params: Params, description = '') => ({
    model: 'service.user',
    params,
    description,
  });

  get = async (params: {
    size: number;
    page: number;
  }): Promise<{ size: number; page: number; total: number; list: Creation[] }> => {
    const { size, page } = params;
    // 查询作品
    const result = await Creation.findAndCountAll({
      order: [['created_at', 'ASC']], // 按created_at 升序
      limit: size * 1, // 指定查询结果的数量
      offset: (page - 1) * size, // 指定查询结果的偏移
    });
    const obj = {
      ...params,
      total: result.count,
      list: result.rows,
    };
    // 返回列表
    return obj;
  };

  findAll = async (params: Params): Promise<Creation[]> => Creation.findAll({
    where: params,
    order: [['created_at', 'ASC']],
  });

  create = async (params: Creation): Promise<Creation> => Creation.create(params);
}
export const creationSvc = new CreationService();
