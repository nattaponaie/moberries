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

export default {
  findAll,
  create,
};
