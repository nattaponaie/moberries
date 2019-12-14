import { person } from 'api/v1.0/domains';

const create = async ({
  firstName,
  lastName,
  addressId,
  transaction,
}) => await person.create({ firstName, lastName, addressId, transaction });

export default {
  create,
};
