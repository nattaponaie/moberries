import models from 'models';

const findAll = () => {
  return models.sizes.findAll();
};

const findSizeByProductIdAndSize = ({
  productId,
  productSize,
}) => {
  const include = [{
    model: models.prices,
  }];
  return models.sizes.findOne({
    where: {
      productId,
      size: productSize,
    },
    include,
  });
};

export default {
  findAll,
  findSizeByProductIdAndSize,
};
