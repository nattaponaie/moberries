import models from 'models';

const findOneByStatus = async statusId => await models.order_statuses.findOne({
  where: {
    status: statusId,
  },
});

const findById = async id => await models.order_statuses.findByPk(id);

export default {
  findOneByStatus,
  findById,
};
