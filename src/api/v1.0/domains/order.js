import models from 'models';

const findAll = () => {
  return models.orders.findAll();
};

const create = ({
  customerId,
  orderStatusId,
  paymentId,
}) => models.orders.create({
  customerId,
  orderStatusId,
  paymentId,
});

const updateOrderStatusById = async ({
  orderId,
  status,
}) => models.orders.update({ orderStatusId: status }, { where: { id: orderId }, returning: true });

export default {
  findAll,
  updateOrderStatusById,
  create,
};
