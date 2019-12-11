import models from 'models';

const findAll = () => {
  return models.products.findAll();
};

export default {
  findAll,
};
