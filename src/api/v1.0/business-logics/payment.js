import { lowerCase } from 'lodash';
import { payment } from '../domains';

const transformPaymentType = (type) => {
  const paymentType = ['pending', 'paid', 'canceled'];
  return paymentType.indexOf(lowerCase(type));
};

const createPayment = async ({
  total,
}) => await payment.create({ total, type: transformPaymentType('pending') });

const updateOrderId = async ({
  orderId,
  paymentId,
}) => await payment.updateOrderId({ orderId, paymentId });

export default {
  createPayment,
  updateOrderId,
};
