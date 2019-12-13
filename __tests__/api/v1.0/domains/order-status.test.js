import { orderStatus } from 'api/v1.0/domains';

jest.mock('models');

describe('findOneByStatus', () => {
  it('should return order status model with status new', async () => {
    const statusId = '0';
    const mockModel = {
      id: 0,
      status: statusId,
      description: 'new',
    };

    orderStatus.findOneByStatus = jest.fn(() => {
      return Promise.resolve(mockModel);
    });

    const result = await orderStatus.findOneByStatus(statusId);
    expect(orderStatus.findOneByStatus).toBeCalled();
    expect(result).toEqual(expect.objectContaining(mockModel));
  });
});

describe('findById', () => {
  it('should return order status model with ID 0', async () => {
    const id = '0';
    const mockModel = {
      id: id,
      status: 'delivered',
      description: 'new',
    };

    orderStatus.findById = jest.fn(() => {
      return Promise.resolve(mockModel);
    });

    const result = await orderStatus.findById(id);
    expect(orderStatus.findById).toBeCalled();
    expect(result).toEqual(expect.objectContaining(mockModel));
  });
});
