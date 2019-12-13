import { get } from 'lodash';
import { orderTransaction } from '../domains';
import { size, payment } from '../business-logics';
import { transformSequelizeModel } from 'utils/json';
import { NotFoundError, RequiredError } from 'utils/error';

const ERROR_CANNOT_FOUND_TRANSACTION = {
  model: 'customer',
  message: 'There is no transaction for this order id',
};

const ERROR_MISSING_UPDATE_FIELD = 'Quantity or product size field is required';

const findTransactionByOrderId = async ({
  orderId,
}) => {
  const result = await orderTransaction.findTransactionByOrderId({ orderId });
  if (result.length === 0) {
    throw new NotFoundError(ERROR_CANNOT_FOUND_TRANSACTION);
  }
  return result;
};

const updateOrderTransaction = async ({
  orderId,
  orderTransactionId,
  quantity,
  productSize,
}) => {
  if (!productSize && !quantity) {
    throw new RequiredError(ERROR_MISSING_UPDATE_FIELD);
  }
  const transaction = transformSequelizeModel(await findTransactionByOrderId({ orderId }));

  let priceSum = 0;
  let paymentId;
  
  const result = await Promise.all(transaction.map(async (tran) => {
    const tranId = get(tran, ['id']);
    if (tranId === orderTransactionId) {
      paymentId = get(tran, 'paymentId');

      const sizeResult = transformSequelizeModel(await size.findSizeByProductIdAndSize({ productId: tran.productId, productSize }));
      const sizeId = get(sizeResult, 'id');
      const productPrice = get(sizeResult, ['price', 'price']);
      priceSum = payment.calculatePrice({ x: priceSum, y: productPrice, quantity: tran.quantity });
      
      await orderTransaction.updateTransaction({ id: tran.id, quantity, sizeId });
      return tran;
    }
    const sizeResult = transformSequelizeModel(await size.findSizeByProductIdAndSizeId({ productId: tran.productId, sizeId: tran.sizeId }));
    const productPrice = get(sizeResult, ['price', 'price']);
    priceSum = payment.calculatePrice({ x: priceSum, y: productPrice, quantity: tran.quantity });
  }));

  if (paymentId) {
    await payment.updateTotal({ total: priceSum, paymentId });
  }

  return result;
};

const createOrderTransaction = async ({
  quantity,
  orderId,
  productId,
  sizeId,
  transaction,
  paymentId,
}) => orderTransaction.create({ quantity,
  orderId,
  productId,
  sizeId,
  transaction,
  paymentId,
});

export default {
  updateOrderTransaction,
  createOrderTransaction,
};
