/* eslint-disable camelcase */

import models from 'models';

const findAll = async ({
  customerId,
  orderStatusId,
}) => {
  const where = [];
  if (customerId || orderStatusId) {
    if (orderStatusId) {
      where.push({ order_status_id: orderStatusId });
    }
    if (customerId) {
      where.push({ customer_id: customerId });
    }
  }
  return await models.orders.findAll({
    where,
  });
};

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
  statusId,
}) => await models.orders.update({ orderStatusId: statusId }, { where: { id: orderId }, returning: true });

export default {
  findAll,
  updateOrderStatusById,
  create,
  findById,
};
