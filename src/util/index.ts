export const jsonFilter = (json: Record<string, any>, exclude: string[]) => {
  const tmp: Record<string, any> = {};
  Object.keys(json).forEach((key) => {
    if (!exclude.includes(key)) {
      tmp[key] = json[key];
    }
  });
  return tmp;
};

export const wrapper = (model: any) => {
  if (model === null) return model;
  let json = model;
  try {
    json = model.toJSON();
  } catch (e) {
    // eslint-disabled
  }
  return jsonFilter(json, ['deleted_at', 'password']);
};

export const listWrapper = (model: any) => {
  const tmp = [];
  model.forEach((item) => {
    tmp.push(wrapper(item));
  });
  return tmp;
};
