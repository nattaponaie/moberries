import { orderTransaction } from 'api/v1.0/domains';

jest.mock('models');

describe('create', () => {
  it('should create order transaction successfully', async () => {
    const quantity = 20;
    const orderId = 1;
    const productId = 17;
    const sizeId = 2;
    const paymentId = 5;

    const mockModel = {
      quantity,
      orderId,
      productId,
      sizeId,
      paymentId,
    };

    orderTransaction.create = jest.fn(() => {
      return Promise.resolve(mockModel);
    });

    const result = await orderTransaction.create({
      quantity,
      orderId,
      productId,
      sizeId,
      paymentId,
    });
    expect(orderTransaction.create).toBeCalled();
    expect(result).toEqual(expect.objectContaining(mockModel));
  });
});

describe('findAllByOrderId', () => {
  it('should return all order transaction model that match order ID', async () => {
    const orderId = 1;

    const mockModel = {
      quantity: 100,
      orderId,
      productId: 17,
      sizeId: 5,
      paymentId: 3,
    };

    orderTransaction.findAllByOrderId = jest.fn(() => {
      return Promise.resolve(mockModel);
    });

    const result = await orderTransaction.findAllByOrderId({ orderId });
    expect(orderTransaction.findAllByOrderId).toBeCalled();
    expect(result).toEqual(expect.objectContaining(mockModel));
  });
});

describe('updateTransaction', () => {
  it('should return order transaction model that updated', async () => {
    const id = 1;
    const quantity = 200;
    const sizeId = 10;
    const orderId = 15;

    const mockModel = {
      id,
      quantity,
      orderId,
      productId: 17,
      sizeId,
      paymentId: 3,
    };

    orderTransaction.updateTransaction = jest.fn(() => {
      return Promise.resolve(mockModel);
    });

    const result = await orderTransaction.updateTransaction({ id, quantity, sizeId, orderId });
    expect(orderTransaction.updateTransaction).toBeCalled();
    expect(result).toEqual(expect.objectContaining(mockModel));
  });
});
