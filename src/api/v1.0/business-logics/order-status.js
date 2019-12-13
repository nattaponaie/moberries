import { lowerCase } from 'lodash';
import { orderStatus } from '../domains';
import { InvalidError } from 'utils/error';
import { ORDER_STATUS } from 'utils/constant';

const ERRORS_STATUS_NOT_FOUND = 'Order status does not exist';

const transformStatusToId = (status) => {
  const statusId = ORDER_STATUS.indexOf(lowerCase(status));
  if (statusId === -1) {
    throw new InvalidError(ERRORS_STATUS_NOT_FOUND);
  }
  return statusId;
};

const transformStatusToName = (status) => {
  const statusName = ORDER_STATUS[status];
  if (!statusName) {
    throw new InvalidError(ERRORS_STATUS_NOT_FOUND);
  }
  return statusName;
};

const findStatusByName = async ({
  status,
}) => {
  const statusId = transformStatusToId(status);
  const customerResult = await orderStatus.findOneByStatus(statusId);
  return customerResult;
};

const findStatusById = async ({
  id,
}) => await orderStatus.findById(id);

export default {
  transformStatusToId,
  findStatusByName,
  transformStatusToName,
  findStatusById,
};
