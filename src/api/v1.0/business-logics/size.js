import { lowerCase } from 'lodash';
import { size } from '../domains';
import { InvalidError } from 'utils/error';

const ERROR_PRODUCT_SIZE_DOES_NOT_EXIST = 'Product size does not exist';

const findAll = async () => {
  try {
    return size.findAll();
  } catch (err) {
    throw err;
  }
};

const transformSize = (productSize) => {
  const productSizeList = ['small', 'medium', 'large'];
  return productSizeList.indexOf(lowerCase(productSize));
};

const findSizeByProductIdAndSize = async ({ productId, productSize }) => {
  const transformedSize = transformSize(productSize);
  if (transformedSize === -1) {
    throw new InvalidError(ERROR_PRODUCT_SIZE_DOES_NOT_EXIST);
  }
  return await size.findSizeByProductIdAndSize({ productId, productSize: transformSize(productSize) });
};

export default {
  findAll,
  findSizeByProductIdAndSize,
};
