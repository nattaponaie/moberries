import { personAddress } from 'api/v1.0/domains';

const create = async ({
  streetAddress,
  transaction,
}) => await personAddress.create({ streetAddress, transaction });

export default {
  create,
};
