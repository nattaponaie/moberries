import models from 'models';

const findAll = () => {
  return models.orderTransactions.findAll();
};

export default {
  findAll,
};
