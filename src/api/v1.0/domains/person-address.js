import models from 'models';

const create = async ({
  streetAddress,
  transaction,
}) => await models.person_addresses.create({
  streetAddress,
}, { transaction });

export default {
  create,
};
