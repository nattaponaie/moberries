import { get } from 'lodash';
import { orderTransaction } from 'api/v1.0/domains';
import { size, payment, order, price } from 'api/v1.0/business-logics';
import { transformSequelizeModel } from 'utils/json';
import { NotFoundError, RequiredError, CustomError } from 'utils/error';

const ERROR_CANNOT_FOUND_TRANSACTION = {
  model: 'customer',
  message: 'There is no transaction for this order id',
};

const ERROR_MISSING_UPDATE_FIELD = 'Quantity or product size field is required';

const findAllByOrderId = async ({
  orderId,
}) => {
  const result = await orderTransaction.findAllByOrderId({ orderId });
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

  const isOrderUpdatable = await order.isOrderUpdatable({ orderId });
  if (!isOrderUpdatable) {
    throw new CustomError(order.ERROR_ORDER_CANNOT_BE_UPDATED);
  }

  const orderTransactionResult = transformSequelizeModel(await findAllByOrderId({ orderId }));

  let priceSum = 0;
  let paymentId;
  let result = {};
  
  await Promise.all(orderTransactionResult.map(async (tran) => {
    const tranId = get(tran, ['id']);
    if (tranId === orderTransactionId) {
      paymentId = get(tran, 'paymentId');

      const sizeResult = transformSequelizeModel(await size.findSizeByProductIdAndSize({ productId: tran.productId, productSize }));
      const sizeId = get(sizeResult, 'id');
      const productPrice = price.getProductPrice({ sizeResult });
      priceSum = payment.calculatePrice({ x: priceSum, y: productPrice, quantity });
      
      result = transformSequelizeModel(await orderTransaction.updateTransaction({ id: tran.id, quantity, sizeId }));
      return result;
    }
    const sizeResult = transformSequelizeModel(await size.findSizeByProductIdAndSizeId({ productId: tran.productId, sizeId: tran.sizeId }));
    const productPrice = price.getProductPrice({ sizeResult });
    priceSum = payment.calculatePrice({ x: priceSum, y: productPrice, quantity: tran.quantity });
    
    return tran;
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
  findAllByOrderId,
  ERROR_MISSING_UPDATE_FIELD,
};
