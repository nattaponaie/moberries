import { lowerCase } from 'lodash';
import { size } from 'api/v1.0/domains';
import { InvalidError } from 'utils/error';
import { PRODUCT_SIZE } from 'utils/constant';

const ERROR_PRODUCT_SIZE_DOES_NOT_EXIST = 'Product size does not exist';

const findAll = async () => size.findAll();

const transformSize = (productSize) => {
  const productSizeId = PRODUCT_SIZE.indexOf(lowerCase(productSize));
  if (productSizeId === -1) {
    throw new InvalidError(ERROR_PRODUCT_SIZE_DOES_NOT_EXIST);
  }
  return productSizeId;
};

const findSizeByProductIdAndSizeId = async ({ productId, sizeId }) => {
  return await size.findSizeByProductIdAndSizeId({ productId, sizeId });
};

const findSizeByProductIdAndSize = async ({ productId, productSize }) => {
  const transformedSize = transformSize(productSize);
  return await size.findSizeByProductIdAndSize({ productId, productSize: transformedSize });
};

export default {
  findAll,
  findSizeByProductIdAndSize,
  findSizeByProductIdAndSizeId,
  transformSize,
  ERROR_PRODUCT_SIZE_DOES_NOT_EXIST,
};
