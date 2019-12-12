import { lowerCase } from 'lodash';
import { orderStatus } from '../domains';

const transformStatus = (status) => {
  const statusList = ['new', 'preparing', 'delivering', 'delivered'];
  return statusList.indexOf(lowerCase(status));
};

const findStatus = async ({
  status,
}) => {
  const statusId = transformStatus(status);
  const customerResult = await orderStatus.findOneByStatus(statusId);
  return customerResult;
};

export default {
  findStatus,
};
