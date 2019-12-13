import { lowerCase } from 'lodash';
import { payment } from '../domains';
import { PAYMENT_TYPE } from 'utils/constant';

const transformPaymentType = (type) => PAYMENT_TYPE.indexOf(lowerCase(type));

const createPayment = async ({
  total,
  type,
  transaction,
}) => await payment.create({ total, type: transformPaymentType(type), transaction });

const updateOrderId = async ({
  orderId,
  paymentId,
  transaction,
}) => await payment.updateOrderId({ orderId, paymentId, transaction });

const updateTotal = async ({
  total,
  paymentId,
  transaction,
}) => await payment.updateTotal({ total, paymentId, transaction });

const calculatePrice = ({
  x,
  y,
  quantity = 1,
}) => parseFloat(x) + (quantity * parseFloat(y));

export default {
  createPayment,
  updateOrderId,
  updateTotal,
  calculatePrice,
};
