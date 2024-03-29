import { get, head } from 'lodash';
import Sequelize from 'sequelize';
import models from 'models';
import { order } from 'api/v1.0/domains';
import {
  customer,
  product,
  size,
  orderStatus,
  price,
  payment,
  orderTransaction,
  personAddress,
  person,
} from 'api/v1.0/business-logics';
import { transformSequelizeModel } from 'utils/json';
import { NotFoundError } from 'utils/error';

const ERROR_CANNOT_FOUND_ORDER = {
  model: 'order',
  message: 'Order id does not exist.',
};

const ERROR_ORDER_CANNOT_BE_UPDATED = {
  status: 402,
  message: 'This order has been delivered already',
};

const findAll = async ({
  customerId,
  statusName,
}) => {
  let orderStatusId;
  if (statusName) {
    const orderStatusResult = transformSequelizeModel(await orderStatus.findStatusByName({ status: statusName }));
    orderStatusId = get(orderStatusResult, 'id');
  }
  return await order.findAll({ customerId, orderStatusId });
};

const findOrderById = async ({ id }) => {
  const orderResult = await order.findById({ id });
  if (!orderResult) {
    throw new NotFoundError(ERROR_CANNOT_FOUND_ORDER);
  }
  return orderResult;
};

const isOrderUpdatable = async ({
  orderId,
}) => {
  const orderResult = transformSequelizeModel(await order.findById({ id: orderId }));
  if (!orderResult) {
    throw new NotFoundError(ERROR_CANNOT_FOUND_ORDER);
  }
  const statusId = get(orderResult, 'orderStatusId');
  const orderStatusResult = transformSequelizeModel(await orderStatus.findStatusById({ id: statusId }));
  const status = get(orderStatusResult, 'status');
  const transformedStatus = orderStatus.transformStatusToName(status);
  if (transformedStatus === 'delivering' || transformedStatus === 'delivered') {
    return false;
  } return true;
  
};

const createOrder = async ({
  productList,
  customerId,
  deliveryInfo,
}) => {
  const transaction = await models.sequelize.transaction({
    autocommit: false,
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
    deferrable: Sequelize.Deferrable.SET_IMMEDIATE,
  });

  try {
    await customer.findCustomerById({ customerId });

    const paymentResult = transformSequelizeModel(await payment.createPayment({ type: 'pending', transaction }));
    const paymentId = get(paymentResult, 'id');

    const orderStatusResult = transformSequelizeModel(await orderStatus.findStatusByName({ status: 'new' }));
    const orderStatusId = get(orderStatusResult, 'id');

    const streetAddress = get(deliveryInfo, 'address');
    const personAddressResult = transformSequelizeModel(await personAddress.create({ streetAddress, transaction }));
    const personAddressId = get(personAddressResult, 'id');

    const firstName = get(deliveryInfo, 'firstName');
    const lastName = get(deliveryInfo, 'lastName');
    const personResult = transformSequelizeModel(await person.create({ firstName, lastName, addressId: personAddressId, transaction }));
    const personId = get(personResult, 'id');
    
    const orderResult = transformSequelizeModel(await order.create({ customerId, paymentId, orderStatusId, personId, transaction }));
    const orderId = get(orderResult, 'id');

    await payment.updateOrderId({ orderId, paymentId, transaction });

    let priceSum = 0;
    await Promise.all(
      productList.map(async ({ name, size: productSize, quantity }) => {
        const productResult = transformSequelizeModel(await product.findProductByName({ name }));
        if (productResult) {
          const productId = get(productResult, 'id');
          
          const sizeResult = transformSequelizeModel(await size.findSizeByProductIdAndSize({ productId, productSize }));
          const sizeId = get(sizeResult, 'id');

          await orderTransaction.createOrderTransaction({
            quantity,
            orderId,
            productId,
            sizeId,
            transaction,
            paymentId,
          });

          const productPrice = price.getProductPrice({ sizeResult });
          priceSum = payment.calculatePrice({ x: priceSum, y: productPrice, quantity });
        }
      }),
    );
    await payment.updateTotal({ total: priceSum, paymentId, transaction });
    await transaction.commit();
    return orderResult;
  } catch (err) {
    await transaction.rollback();
    return err;
  }
};

const updateOrderStatusById = async ({
  orderId,
  status,
}) => {
  const orderStatusResult = transformSequelizeModel(await orderStatus.findStatusByName({ status }));
  const orderStatusId = get(orderStatusResult, 'id');
  const orderResult = await order.updateOrderStatusById({ orderId, statusId: orderStatusId });
  const success = head(orderResult);
  if (success === 0) {
    throw new NotFoundError(ERROR_CANNOT_FOUND_ORDER);
  }
  return orderResult;
};

export default {
  findAll,
  createOrder,
  updateOrderStatusById,
  isOrderUpdatable,
  ERROR_ORDER_CANNOT_BE_UPDATED,
  findOrderById,
};
