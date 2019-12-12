import { orderTransaction } from '../domains';

const findAll = async () => {
  try {
    return orderTransaction.findAll();
  } catch (err) {
    throw err;
  }
};

const createOrderTransaction = async ({
  quantity,
  orderId,
  productId,
  sizeId,
}) => {

};

export default {
  findAll,
  createOrderTransaction,
};
