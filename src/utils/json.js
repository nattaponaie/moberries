import { reduce, camelCase, isArray, map, keys } from 'lodash/fp';

const transformObjectToCamel = obj => reduce(
  (camelCaseObject, key) => {
    camelCaseObject[camelCase(key)] = obj[key];
    return camelCaseObject;
  },
  {},
  keys(obj),
);

const transformToCamelCaseKey = (obj) => {
  if (isArray(obj)) {
    return map(transformObjectToCamel, obj);
  }
  return transformObjectToCamel(obj);
};

export const transformSequelizeModel = sequelizeModel => transformToCamelCaseKey(JSON.parse(JSON.stringify(sequelizeModel)));

export const apiResponse = ({ type = '', response }) => {
  return {
    type: type,
    attributes: response,
  };
};
