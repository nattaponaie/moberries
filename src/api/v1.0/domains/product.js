import models from 'models';

const findAll = async () => models.products.findAll();

const findProductByName = async ({
  name,
}) => await models.products.findOne({
  where: {
    name,
  },
});

export default {
  findAll,
  findProductByName,
};
