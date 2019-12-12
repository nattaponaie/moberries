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
  const productSizeId = productSizeList.indexOf(lowerCase(productSize));
  if (productSizeId === -1) {
    throw new InvalidError(ERROR_PRODUCT_SIZE_DOES_NOT_EXIST);
  }
  return productSizeId;
};

const findSizeByProductIdAndSize = async ({ productId, productSize }) => {
  const transformedSize = transformSize(productSize);
  return await size.findSizeByProductIdAndSize({ productId, productSize: transformedSize });
};

export default {
  findAll,
  findSizeByProductIdAndSize,
};
