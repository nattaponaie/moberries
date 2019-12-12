import models from 'models';

const create = ({
  quantity,
  orderId,
  productId,
  sizeId,
}) => models.order_transactions.create({
  quantity,
  orderId,
  productId,
  sizeId,
});

export default {
  create,
};
