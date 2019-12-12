import models from 'models';

const findOneByStatus = statusId => models.order_statuses.findOne({
  where: {
    status: statusId,
  },
});

export default {
  findOneByStatus,
};
