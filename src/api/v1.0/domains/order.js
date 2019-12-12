import models from 'models';

const findAll = () => {
  return models.orders.findAll();
};

const create = ({
  customerId,
  orderStatusId,
  paymentId,
}) => {
  return models.orders.create({
    customerId,
    orderStatusId,
    paymentId,
  });
};

export default {
  findAll,
  create,
};
