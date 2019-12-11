import { DateTime } from 'luxon';
import orderStatusData from '../fixtures/order-status';
import models from 'models';

module.exports = {
  up: queryInterface => queryInterface.sequelize.transaction(async () => {
    return Promise.all(orderStatusData.map(async (data) => {
      await models.order_statuses.findOrCreate({
        where: {
          status: data.status,
        },
        defaults: {
          ...data,
          createdAt: DateTime.local().toSQL(),
          updatedAt: DateTime.local().toSQL(),
        },
      });
    }));
  }),
  down: queryInterface => queryInterface.sequelize.transaction(async () => queryInterface.bulkDelete('order_statuses', null, {})),
};
