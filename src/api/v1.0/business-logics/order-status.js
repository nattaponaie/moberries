import { lowerCase } from 'lodash';
import { orderStatus } from '../domains';
import { InvalidError } from 'utils/error';

const ERRORS_STATUS_NOT_FOUND = 'Order status does not exist';

const transformStatus = (status) => {
  const statusList = ['new', 'preparing', 'delivering', 'delivered'];
  const statusId = statusList.indexOf(lowerCase(status));
  if (statusId === -1) {
    throw new InvalidError(ERRORS_STATUS_NOT_FOUND);
  }
  return statusId;
};

const findStatus = async ({
  status,
}) => {
  const statusId = transformStatus(status);
  const customerResult = await orderStatus.findOneByStatus(statusId);
  return customerResult;
};

export default {
  transformStatus,
  findStatus,
};
