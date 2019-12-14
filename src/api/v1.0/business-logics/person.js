import { person } from '../domains';

const create = async ({
  firstName,
  lastName,
  addressId,
  transaction,
}) => await person.create({ firstName, lastName, addressId, transaction });

export default {
  create,
};
