import models from 'models';

const findAll = () => {
  return models.sizes.findAll();
};

const findSizeByProductIdAndSize = async ({
  productId,
  productSize,
}) => {
  const include = [{
    model: models.prices,
  }];
  return await models.sizes.findOne({
    where: {
      productId,
      size: productSize,
    },
    include,
  });
};

const findSizeByProductIdAndSizeId = async ({
  productId,
  sizeId,
}) => {
  const include = [{
    model: models.prices,
  }];
  return await models.sizes.findOne({
    where: {
      id: sizeId,
      productId,
    },
    include,
  });
};

const create = async ({
  size,
  productId,
}) => await models.sizes.create({
  size,
  productId,
});

const updatePriceIdById = async ({
  id,
  priceId,
}) => await models.sizes.update({ priceId }, {
  where: {
    id: id,
  },
  returning: true,
});

export default {
  findAll,
  findSizeByProductIdAndSize,
  findSizeByProductIdAndSizeId,
  create,
  updatePriceIdById,
};
