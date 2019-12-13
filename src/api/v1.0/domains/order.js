import models from 'models';

const findAll = async () => await models.orders.findAll();

const findById = async ({
  id,
}) => await models.orders.findByPk(id);

const create = async ({
  customerId,
  orderStatusId,
  paymentId,
  transaction,
}) => await models.orders.create({
  customerId,
  orderStatusId,
  paymentId,
}, { transaction });

const updateOrderStatusById = async ({
  orderId,
  status,
}) => await models.orders.update({ orderStatusId: status }, { where: { id: orderId }, returning: true });

export default {
  findAll,
  updateOrderStatusById,
  create,
  findById,
};
