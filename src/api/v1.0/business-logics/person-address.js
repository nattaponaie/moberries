import { personAddress } from '../domains';

const create = async ({
  streetAddress,
  transaction,
}) => await personAddress.create({ streetAddress, transaction });

export default {
  create,
};
