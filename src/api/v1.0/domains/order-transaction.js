import models from 'models';

const create = async ({
  quantity,
  orderId,
  productId,
  sizeId,
  transaction,
  paymentId,
}) =>
  models.order_transactions.create({
    quantity,
    orderId,
    productId,
    sizeId,
    paymentId,
  }, { transaction });

const findTransactionByOrderId = ({
  orderId,
}) => models.order_transactions.findAll({
  where: { orderId },
  include: [
    {
      model: models.products,
    },
  ],
});

const updateTransaction = ({
  id,
  quantity,
  sizeId,
  orderId,
}) => models.order_transactions.update({ quantity, sizeId, orderId },
  {
    where: {
      id,
    },
  });


export default {
  create,
  findTransactionByOrderId,
  updateTransaction,
};
