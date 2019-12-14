import { product } from 'api/v1.0/domains';
import { lowerCase } from 'lodash';

const findAll = async () => product.findAll();

const findProductByName = async ({ name }) => await product.findProductByName({ name: lowerCase(name) });

export default {
  findAll,
  findProductByName,
};
