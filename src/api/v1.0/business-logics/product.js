import { product } from '../domains';
import { lowerCase } from 'lodash';

const findAll = async () => product.findAll();

const findProductByName = async ({ name }) => {
  return await product.findProductByName({ name: lowerCase(name) });
};

export default {
  findAll,
  findProductByName,
};
