import { get } from 'lodash';
// import { customer } from '../domains';

const getProductPrice = ({
  sizeResult,
}) => get(sizeResult, ['price', 'price']);

export default {
  getProductPrice,
};
