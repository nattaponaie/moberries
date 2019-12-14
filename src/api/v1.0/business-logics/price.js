import { get } from 'lodash';
import { price } from 'api/v1.0/domains';

const getProductPrice = ({
  sizeResult,
}) => get(sizeResult, ['price', 'price']);

const create = async ({
  productPrice,
  sizeId,
}) => await price.create({ price: productPrice, sizeId });

export default {
  getProductPrice,
  create,
};
