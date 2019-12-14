/* eslint-disable camelcase */

import { reduce, camelCase, isArray, map, keys } from 'lodash/fp';

export const transformObjectToCamel = obj => reduce(
  (camelCaseObject, key) => {
    camelCaseObject[camelCase(key)] = obj[key];
    return camelCaseObject;
  },
  {},
  keys(obj),
);

export const transformToCamelCaseKey = (obj) => {
  if (isArray(obj)) {
    return map(transformObjectToCamel, obj);
  }
  return transformObjectToCamel(obj);
};

export const transformSequelizeModel = sequelizeModel => transformToCamelCaseKey(JSON.parse(JSON.stringify(sequelizeModel)));

export const apiResponse = ({ resource = '', response }) => {
  return {
    resource,
    attributes: response,
  };
};
