import models from 'models';

const create = async ({
  quantity,
  orderId,
  productId,
  sizeId,
  transaction,
  paymentId,
}) =>
  await models.order_transactions.create({
    quantity,
    orderId,
    productId,
    sizeId,
    paymentId,
  }, { transaction });

const findAllByOrderId = async ({
  orderId,
}) => await models.order_transactions.findAll({
  where: { orderId },
  include: [
    {
      model: models.products,
    },
  ],
});

const updateTransaction = async ({
  id,
  quantity,
  sizeId,
  orderId,
  transaction,
}) => await models.order_transactions.update({ quantity, sizeId, orderId },
  {
    where: {
      id,
    },
  }, { transaction });


export default {
  create,
  findAllByOrderId,
  updateTransaction,
};
