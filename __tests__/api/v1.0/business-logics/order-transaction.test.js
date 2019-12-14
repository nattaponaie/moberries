import {
  orderTransaction,
  order,
  size,
  payment,
} from 'api/v1.0/business-logics';

import * as domains from 'api/v1.0/domains';

import { RequiredError, CustomError } from 'utils/error';

jest.mock('utils/json', () => ({
  transformSequelizeModel: jest.fn((model) => model),
}));

jest.mock('api/v1.0/domains');

describe('updateOrderTransaction', () => {
  it('should throw error when both productSize and quantity fields are not provided', async () => {
    const orderId = 17;
    const orderTransactionId = 18;

    await expect(
      orderTransaction.updateOrderTransaction({ orderId, orderTransactionId })
    ).rejects.toEqual(new RequiredError(orderTransaction.ERROR_MISSING_UPDATE_FIELD));
    
  });

  it('should throw error when order is not updatable', async () => {
    const orderId = 17;
    const orderTransactionId = 18;
    const quantity = 50;
    const productSize = 'small';

    order.isOrderUpdatable = jest.fn(() => Promise.resolve(false));
    await expect(
      orderTransaction.updateOrderTransaction({ orderId, orderTransactionId, quantity, productSize })
    ).rejects.toEqual(new CustomError(order.ERROR_ORDER_CANNOT_BE_UPDATED));

  });

  it('should update order transaction successfully', async () => {
    const orderId = 17;
    const orderTransactionId = 18;
    const quantity = 50;
    const productSize = 'small';

    const mockOrderTransactionModel = [
      {
        id: orderTransactionId,
        quantity: 20,
        orderId,
        productId: 1,
        sizeId: 4,
        paymentId: 20,
      },
      {
        id: 19,
        quantity: 21,
        orderId,
        productId: 2,
        sizeId: 4,
        paymentId: 20,
      },
    ];

    const mockSizeModel = {
      id: 1,
      price: {
        price: 60.00,
      },
    };

    order.isOrderUpdatable = jest.fn(() => Promise.resolve(true));
    domains.orderTransaction.findAllByOrderId = jest.fn(() => Promise.resolve(mockOrderTransactionModel));
    size.findSizeByProductIdAndSize = jest.fn(() => Promise.resolve(mockSizeModel));
    payment.calculatePrice = jest.fn();
    domains.orderTransaction.updateTransaction = jest.fn(() => Promise.resolve());

    size.findSizeByProductIdAndSizeId = jest.fn(() => mockSizeModel);

    payment.updateTotal = jest.fn(() => Promise.resolve());

    const result = await orderTransaction.updateOrderTransaction({ orderId, orderTransactionId, quantity, productSize });
    expect(result[0]).toMatchObject(expect.objectContaining({
      id: 18,
      quantity: 20,
      orderId,
      productId: 1,
      sizeId: 4,
      paymentId: 20,
    }));
    expect(result[1]).toMatchObject(expect.objectContaining({
      id: 19,
      quantity: 21,
      orderId,
      productId: 2,
      sizeId: 4,
      paymentId: 20,
    }));

    expect(order.isOrderUpdatable).toBeCalled();
    expect(size.findSizeByProductIdAndSize).toBeCalled();
    expect(payment.calculatePrice).toBeCalled();
    expect(domains.orderTransaction.updateTransaction).toBeCalled();
    expect(size.findSizeByProductIdAndSizeId).toBeCalled();
    expect(payment.updateTotal).toBeCalled();
  });
});
