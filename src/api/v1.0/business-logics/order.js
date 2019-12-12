import { get } from 'lodash';
import { order } from '../domains';
import { customer, product, size, orderStatus, price, payment } from '../business-logics';
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
  const customerResult = await customer.findCustomerById({ customerId });

  let priceSum = 0;
  await Promise.all(
    productList.map(async ({ name, size: productSize }) => {
      const productResult = transformSequelizeModel(await product.findProductByName({ name }));
      if (productResult) {
        const sizeResult = transformSequelizeModel(await size.findSizeByProductIdAndSize({ productId: productResult.id, productSize }));
        const productPrice = price.getProductPrice({ sizeResult });
        priceSum = parseFloat(priceSum) + parseFloat(productPrice);
      }
    }),
  );
  
  const paymentResult = transformSequelizeModel(await payment.createPayment({ total: priceSum }));
  const paymentId = get(paymentResult, 'id');

  const orderStatusResult = transformSequelizeModel(await orderStatus.findStatus({ status: 'new' }));
  const orderStatusId = get(orderStatusResult, 'id');
  const orderResult = await order.create({ customerId, paymentId, orderStatusId });
  
  const orderId = get(transformSequelizeModel(orderResult), 'id');
  await payment.updateOrderId({ orderId, paymentId });
  
  return customerResult;
};

export default {
  findAll,
  createOrder,
};
