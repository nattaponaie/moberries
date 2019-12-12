import { DateTime } from 'luxon';
import productData from '../fixtures/product';
import sizeData from '../fixtures/size';
import { logError } from 'utils/logger';
import { head, get } from 'lodash';
import models from 'models';

module.exports = {
  up: queryInterface => queryInterface.sequelize.transaction(async () => {
    try {
      return Promise.all(productData.map(async (product) => {
        const productResult = await models.products.findOrCreate({
          where: {
            name: product.name,
          },
          defaults: {
            ...product,
            createdAt: DateTime.local().toSQL(),
            updatedAt: DateTime.local().toSQL(),
          },
        });

        const productId = get(head(productResult), 'id');
        const sizeFilter = sizeData.filter((size) => size.product_name === product.name);

        return Promise.all(sizeFilter.map(async (data) => {
          const sizeResult = await models.sizes.findOrCreate({
            where: {
              productId: productId,
            },
            defaults: {
              size: data.size,
              productId: productId,
              createdAt: DateTime.local().toSQL(),
              updatedAt: DateTime.local().toSQL(),
            },
          });
          const sizeId = get(head(sizeResult), 'id');

          const priceResult = await models.prices.findOrCreate({
            where: {
              sizeId,
            },
            defaults: {
              sizeId,
              price: data.price,
              createdAt: DateTime.local().toSQL(),
              updatedAt: DateTime.local().toSQL(),
            },
          });
          const priceId = get(head(priceResult), 'id');

          await models.sizes.update({ priceId }, {
            where: {
              id: sizeId,
            },
          });
        }));
      
      }));
    } catch (err) {
      logError(err);
    }
  }),
  down: queryInterface => queryInterface.sequelize.transaction(async () => {
    queryInterface.bulkDelete('products', null, {});
    queryInterface.bulkDelete('prices', null, {});
    queryInterface.bulkDelete('sizes', null, {});
  }),
};
