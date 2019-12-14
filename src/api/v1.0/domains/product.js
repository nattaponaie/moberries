import models from 'models';

const findAll = async () => models.products.findAll();

const findProductByName = async ({
  name,
}) => await models.products.findOne({
  where: {
    name,
  },
});

const create = async ({
  name,
  description,
}) => await models.products.create({
  name,
  description,
});

export default {
  findAll,
  findProductByName,
  create,
};
