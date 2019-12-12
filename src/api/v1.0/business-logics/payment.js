import { lowerCase } from 'lodash';
import { payment } from '../domains';

const transformPaymentType = (type) => {
  const paymentType = ['pending', 'paid', 'canceled'];
  return paymentType.indexOf(lowerCase(type));
};

const createPayment = async ({
  total,
  type,
}) => await payment.create({ total, type: transformPaymentType(type) });

const updateOrderId = async ({
  orderId,
  paymentId,
}) => await payment.updateOrderId({ orderId, paymentId });

const updateTotal = async ({
  total,
  paymentId,
}) => await payment.updateTotal({ total, paymentId });

export default {
  createPayment,
  updateOrderId,
  updateTotal,
};
