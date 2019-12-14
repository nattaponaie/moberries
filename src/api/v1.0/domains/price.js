import models from 'models';

const create = async ({
  sizeId,
  price,
}) => await models.prices.create({
  sizeId,
  price,
});

export default {
  create,
};
