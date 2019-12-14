import { DateTime } from 'luxon';
import { get, head } from 'lodash';
import productData from '../fixtures/product';
import sizeData from '../fixtures/size';
import { transformSequelizeModel } from 'utils/json';
import models from 'models';

module.exports = {
  up: queryInterface => queryInterface.sequelize.transaction(async () => {
    for (const product of productData) {
      const productResult = transformSequelizeModel(await models.products.findOrCreate({
        where: {
          name: product.name,
        },
        defaults: {
          ...product,
          createdAt: DateTime.local().toSQL(),
          updatedAt: DateTime.local().toSQL(),
        },
      }));

      const productId = get(head(productResult), 'id');
      const sizeFilter = sizeData.filter((size) => size.product_name === product.name);

      for (const data of sizeFilter) {
        const sizeResult = transformSequelizeModel(await models.sizes.findOrCreate({
          where: {
            productId: productId,
            size: data.size,
          },
          defaults: {
            size: data.size,
            productId: productId,
            createdAt: DateTime.local().toSQL(),
            updatedAt: DateTime.local().toSQL(),
          },
        }));
        const sizeId = get(head(sizeResult), 'id');

        const priceResult = transformSequelizeModel(await models.prices.findOrCreate({
          where: {
            sizeId,
          },
          defaults: {
            sizeId,
            price: data.price,
            createdAt: DateTime.local().toSQL(),
            updatedAt: DateTime.local().toSQL(),
          },
        }));
        const priceId = get(head(priceResult), 'id');

        await models.sizes.update({ priceId }, {
          where: {
            id: sizeId,
          },
        });
      }
    }
  }),
  down: queryInterface => queryInterface.sequelize.transaction(async () => {
    queryInterface.bulkDelete('products', null, {});
    queryInterface.bulkDelete('prices', null, {});
    queryInterface.bulkDelete('sizes', null, {});
  }),
};
