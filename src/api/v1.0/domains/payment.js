import models from 'models';

const create = async ({ total = 0, type = 0, transaction }) => await models.payments.create({
  type,
  total: parseFloat(total).toFixed(2),
}, { transaction });

const updateOrderId = async ({ orderId, paymentId, transaction }) => await models.payments.update({ orderId },
  {
    where: {
      id: paymentId,
    },
    transaction,
  });

const updateTotal = async ({
  total,
  paymentId,
}) => await models.payments.update({ total: parseFloat(total).toFixed(2) },
  { where: {
    id: paymentId,
  }, returning: true });

export default {
  create,
  updateOrderId,
  updateTotal,
};
