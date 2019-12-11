import { product } from '../domains';

const findAll = async () => {
  try {
    return product.findAll();
  } catch (err) {
    throw err;
  }
};

export default {
  findAll,
};
