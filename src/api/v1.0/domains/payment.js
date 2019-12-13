import models from 'models';

const create = ({ total = 0, type = 0, transaction }) => models.payments.create({
  type,
  total: parseFloat(total).toFixed(2),
}, { transaction });

const updateOrderId = ({ orderId, paymentId, transaction }) => models.payments.update({ orderId },
  {
    where: {
      id: paymentId,
    },
    transaction,
  });

const updateTotal = async ({
  total,
  paymentId,
  transaction,
}) => models.payments.update({ total: parseFloat(total).toFixed(2) },
  { where: {
    id: paymentId,
  }, transaction });

export default {
  create,
  updateOrderId,
  updateTotal,
};
