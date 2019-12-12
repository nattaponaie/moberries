import models from 'models';

const findOneByCustomerId = customerId => models.customers.findByPk(customerId);

export default {
  findOneByCustomerId,
};
