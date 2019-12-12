import models from 'models';

const create = ({ total = 0, type = 0 }) => models.payments.create({
  type,
  total: parseFloat(total).toFixed(2),
});

const updateOrderId = ({ orderId, paymentId }) => models.payments.update({ orderId },
  { where: {
    id: paymentId,
  } });

const updateTotal = async ({
  total,
  paymentId,
}) => models.payments.update({ total: parseFloat(total).toFixed(2) },
  { where: {
    id: paymentId,
  } });

export default {
  create,
  updateOrderId,
  updateTotal,
};
