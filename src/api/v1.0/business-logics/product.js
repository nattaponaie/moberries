import { lowerCase, get, isEmpty } from 'lodash';

import { size, price } from 'api/v1.0/business-logics';
import { product } from 'api/v1.0/domains';
import { transformSequelizeModel } from 'utils/json';
import { CustomError } from 'utils/error';

const ERROR_PRODUCT_ALREADY_EXISTS = {
  status: 400,
  message: 'This product name already exist',
};

const findAll = async () => product.findAll();

const findProductByName = async ({ name }) => await product.findProductByName({ name: lowerCase(name) });

const create = async ({ productList }) => {
  return Promise.all(productList.map(async (item) => {
    const findProductResult = transformSequelizeModel(await product.findProductByName({ name: item.name }));
    if (isEmpty(findProductResult)) {
      const productResult = transformSequelizeModel(await product.create({ name: item.name, description: item.description }));
      const productId = get(productResult, 'id');

      const sizeResult = transformSequelizeModel(await size.create({ sizeName: item.size, productId }));
      const sizeId = get(sizeResult, 'id');

      const priceResult = transformSequelizeModel(await price.create({ productPrice: item.price, sizeId }));
      const priceId = get(priceResult, 'id');

      const sizeUpdateResult = transformSequelizeModel(await size.updatePriceIdById({ id: sizeId, priceId }));
      return {
        productResult,
        sizeUpdateResult,
        priceResult,
      };
    }
    return {
      productName: item.name,
      error: new CustomError(ERROR_PRODUCT_ALREADY_EXISTS),
    };
    
  }));
};

export default {
  findAll,
  findProductByName,
  create,
};
