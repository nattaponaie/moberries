import { get } from 'lodash';
import { order } from '../domains';
import { customer, product, size, orderStatus, price, payment, orderTransaction } from '../business-logics';
import { transformSequelizeModel } from 'utils/json';

const findAll = async () => {
  try {
    return order.findAll();
  } catch (err) {
    throw err;
  }
};

const createOrder = async ({
  productList,
  customerId,
}) => {
  await customer.findCustomerById({ customerId });

  const paymentResult = transformSequelizeModel(await payment.createPayment({ type: 'pending' }));
  const paymentId = get(paymentResult, 'id');

  const orderStatusResult = transformSequelizeModel(await orderStatus.findStatus({ status: 'new' }));
  const orderStatusId = get(orderStatusResult, 'id');
  
  const orderResult = transformSequelizeModel(await order.create({ customerId, paymentId, orderStatusId }));
  const orderId = get(orderResult, 'id');

  await payment.updateOrderId({ orderId, paymentId });

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
        });

        const productPrice = price.getProductPrice({ sizeResult });
        priceSum = parseFloat(priceSum) + parseFloat(productPrice);
      }
    }),
  );

  await payment.updateTotal({ total: priceSum, paymentId });
  
  return orderResult;
};

const updateOrderStatusById = async ({
  orderId,
  status,
}) => {
  const transformedStatus = orderStatus.transformStatus(status);
  const orderResult = await order.updateOrderStatusById({ orderId, status: transformedStatus });
  return orderResult;
};

export default {
  findAll,
  createOrder,
  updateOrderStatusById,
};
