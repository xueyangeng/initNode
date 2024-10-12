import { Op } from 'sequelize';

// 获取列表的公共参数
export type ListOptions = {
  page: number;
  size: number;
  query?: string;
  status?: boolean;
}

export type Params = Record<string, any>;

export class BaseService {
  // eslint-disable-next-line class-methods-use-this
  isUndefined = (value:any) => typeof value === 'undefined';

  makeExsitCond = (params:Params, fields:string[]) => {
    const ors = [];
    fields.forEach((item) => {
      if (!this.isUndefined(params[item])) {
        ors.push({
          [`${item}`]: params[item],
        });
      }
    });
    const cond = {
      [Op.or]: ors,
      [Op.and]: [],
    };
    return cond;
  };

  makeListCond = (options: ListOptions, fields:string[]) => {
    const ors = [];
    fields.forEach((item) => {
      ors.push({
        [`${item}`]: {
          [Op.like]: `%${options.query}%`,
        },
      });
    });
    const cond = {
      [Op.and]: [],
    };
    if (options.query) {
      cond[Op.or] = ors;
    }
    if (!this.isUndefined(options.status)) {
      cond[Op.and] = [{ status: options.status }];
    }
    return cond;
  };
}
