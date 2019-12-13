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

export default {
  findAll,
  findSizeByProductIdAndSize,
  findSizeByProductIdAndSizeId,
};
