import { get } from 'lodash';

const getProductPrice = ({
  sizeResult,
}) => get(sizeResult, ['price', 'price']);

export default {
  getProductPrice,
};
