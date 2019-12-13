import {
  order,
  customer,
  payment,
  orderStatus,
  product,
  size,
  orderTransaction,
  price,
} from 'api/v1.0/business-logics';

import {
  order as orderDomain,
} from 'api/v1.0/domains';

jest.mock('utils/json', () => ({
  transformSequelizeModel: jest.fn((model) => model),
}));

jest.mock('models', () => ({
  sequelize: {
    transaction: jest.fn(() => ({
      commit: jest.fn(() => true),
      rollback: jest.fn(() => false),
    })),
  },
}));

describe('createOrder', () => {
  it('should create order successfully', async () => {
    const productList = [
      {
        'name': 'margarita',
        'size': 'small',
        'quantity': '3',
      },
      {
        'name': 'margarita',
        'size': 'medium',
        'quantity': '10',
      },
      {
        'name': 'marinara',
        'size': 'medium',
        'quantity': '3',
      },
    ];
    const orderId = 102;
    const orderStatusId = 0;
    const customerId = 99;

    customer.findCustomerById = jest.fn(() => Promise.resolve());
    payment.createPayment = jest.fn(() => Promise.resolve({ id: 100 }));
    orderStatus.findStatusByName = jest.fn(() => Promise.resolve({ id: 101 }));
    orderDomain.create = jest.fn(() => Promise.resolve({ id: orderId, customerId, orderStatusId: orderStatusId }));
    payment.updateOrderId = jest.fn(() => Promise.resolve());
    product.findProductByName = jest.fn(() => Promise.resolve({ id: 103 }));
    size.findSizeByProductIdAndSize = jest.fn(() => Promise.resolve({ id: 104 }));
    orderTransaction.createOrderTransaction = jest.fn(() => Promise.resolve());
    price.getProductPrice = jest.fn(() => 2000);
    payment.updateTotal = jest.fn(() => Promise.resolve());

    const result = await order.createOrder({ productList, customerId });

    expect(customer.findCustomerById).toBeCalled();
    expect(payment.createPayment).toBeCalled();
    expect(orderStatus.findStatusByName).toBeCalled();
    expect(orderDomain.create).toBeCalled();
    expect(payment.updateOrderId).toBeCalled();
    expect(product.findProductByName).toBeCalled();
    expect(size.findSizeByProductIdAndSize).toBeCalled();
    expect(orderTransaction.createOrderTransaction).toBeCalled();
    expect(price.getProductPrice).toBeCalled();
    expect(payment.updateTotal).toBeCalled();

    expect(result.id).toBe(orderId);
    expect(result.customerId).toBe(customerId);
    expect(result.orderStatusId).toBe(orderStatusId);
    
  });
});

describe('isOrderUpdatable', () => {
  it('should return true when order status is not delivering or delivered', async () => {

    const mockOrderModel = {
      id: 10,
      customerId: 99,
      orderStatusId: 2,
    };

    const mockOrderStatusModel = {
      id: 0,
      status: 0,
      description: 'new',
    };

    const orderId = 10;

    orderDomain.findById = jest.fn(() => Promise.resolve(mockOrderModel));
    orderStatus.findStatusById = jest.fn(() => Promise.resolve(mockOrderStatusModel));
    orderStatus.transformStatusToName = jest.fn(() => 'new');

    const result = await order.isOrderUpdatable({ orderId });
    expect(result).toBeTruthy();
    
  });

  it('should return false when order status is delivering', async () => {

    const mockOrderModel = {
      id: 10,
      customerId: 99,
      orderStatusId: 2,
    };

    const mockOrderStatusModel = {
      id: 0,
      status: 2,
      description: 'delivering',
    };

    const orderId = 10;

    orderDomain.findById = jest.fn(() => Promise.resolve(mockOrderModel));
    orderStatus.findStatusById = jest.fn(() => Promise.resolve(mockOrderStatusModel));
    orderStatus.transformStatusToName = jest.fn(() => 'delivering');

    const result = await order.isOrderUpdatable({ orderId });
    expect(result).toBeFalsy();
    
  });

  it('should return false when order status is delivered', async () => {

    const mockOrderModel = {
      id: 10,
      customerId: 99,
      orderStatusId: 2,
    };

    const mockOrderStatusModel = {
      id: 0,
      status: 3,
      description: 'delivered',
    };

    const orderId = 10;

    orderDomain.findById = jest.fn(() => Promise.resolve(mockOrderModel));
    orderStatus.findStatusById = jest.fn(() => Promise.resolve(mockOrderStatusModel));
    orderStatus.transformStatusToName = jest.fn(() => 'delivered');

    const result = await order.isOrderUpdatable({ orderId });
    expect(result).toBeFalsy();
    
  });
});
