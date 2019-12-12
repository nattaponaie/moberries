import models from 'models';

const create = ({ total, type = 0 }) => models.payments.create({
  type,
  total: parseFloat(total).toFixed(2),
});

const updateOrderId = ({ orderId, paymentId }) => models.payments.update({ orderId },
  { where: {
    id: paymentId,
  } });

export default {
  create,
  updateOrderId,
};
