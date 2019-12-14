import { customer } from 'api/v1.0/domains';

jest.mock('models');

describe('findOneByCustomerId', () => {
  it('should return customer model with ID 99', async () => {
    const customerId = '99';
    const mockCustomerModel = {
      id: customerId,
      personId: 1,
    };

    customer.findOneByCustomerId = jest.fn(() => {
      return Promise.resolve(mockCustomerModel);
    });

    const result = await customer.findOneByCustomerId(customerId);
    expect(customer.findOneByCustomerId).toBeCalled();
    expect(result).toEqual(expect.objectContaining(mockCustomerModel));
  });
});
