import Sequelize from 'sequelize';
import { get } from 'lodash';

import models from 'models';
import { customer } from 'api/v1.0/domains';
import { personAddress, person } from 'api/v1.0/business-logics';
import { NotFoundError } from 'utils/error';
import { transformSequelizeModel } from 'utils/json';

const ERROR_CANNOT_FOUND_CUSTOMER = {
  model: 'customer',
  message: 'Customer id does not exist',
};

const findCustomerById = async ({
  customerId,
}) => {
  const customerResult = await customer.findOneByCustomerId(customerId);
  if (!customerResult) {
    throw new NotFoundError(ERROR_CANNOT_FOUND_CUSTOMER);
  }
  return customerResult;
};

const create = async ({
  firstName,
  lastName,
  streetAddress,
}) => {
  const transaction = await models.sequelize.transaction({
    autocommit: false,
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
    deferrable: Sequelize.Deferrable.SET_IMMEDIATE,
  });

  try {
    const personAddressResult = transformSequelizeModel(await personAddress.create({ streetAddress, transaction }));
    const personAddressId = get(personAddressResult, 'id');

    const personResult = transformSequelizeModel(await person.create({ firstName, lastName, addressId: personAddressId, transaction }));
    const personId = get(personResult, 'id');

    const customerResult = await customer.create({ personId, transaction });
    transaction.commit();
    return customerResult;
  } catch (err) {
    transaction.rollback();
    return err;
  }
  
};

export default {
  findCustomerById,
  ERROR_CANNOT_FOUND_CUSTOMER,
  create,
};
