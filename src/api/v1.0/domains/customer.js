import models from 'models';

const findOneByCustomerId = async customerId => await models.customers.findByPk(customerId);

const create = async ({
  personId,
  transaction,
}) => await models.customers.create({
  personId,
}, { transaction });

export default {
  findOneByCustomerId,
  create,
};
