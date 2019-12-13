import models from 'models';

const findOneByCustomerId = async customerId => await models.customers.findByPk(customerId);

export default {
  findOneByCustomerId,
};
