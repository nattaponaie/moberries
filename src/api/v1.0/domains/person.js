import models from 'models';

const create = async ({
  firstName,
  lastName,
  addressId,
  transaction,
}) => await models.persons.create({
  firstName,
  lastName,
  addressId,
}, { transaction });

export default {
  create,
};
