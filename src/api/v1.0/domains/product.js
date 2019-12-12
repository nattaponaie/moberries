import models from 'models';

const findAll = () => {
  return models.products.findAll();
};

const findProductByName = ({
  name,
}) => {
  return models.products.findOne({
    where: {
      name,
    },
  });
};

export default {
  findAll,
  findProductByName,
};
