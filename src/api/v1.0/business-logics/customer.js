import { customer } from '../domains';
import { NotFoundError } from 'utils/error';

const ERROR_CANNOT_FOUND_CUSTOMER = {
  model: 'customer',
  message: 'Customer id does not exist.',
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

export default {
  findCustomerById,
  ERROR_CANNOT_FOUND_CUSTOMER,
};
