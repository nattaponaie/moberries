import { product } from '../domains';
import { lowerCase } from 'lodash';

const findAll = async () => {
  try {
    return product.findAll();
  } catch (err) {
    throw err;
  }
};

const findProductByName = async ({ name }) => {
  return await product.findProductByName({ name: lowerCase(name) });
};

export default {
  findAll,
  findProductByName,
};
