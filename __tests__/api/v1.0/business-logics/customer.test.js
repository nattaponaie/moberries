import {
  customer,
  personAddress,
  person,
} from 'api/v1.0/business-logics';

import * as domains from 'api/v1.0/domains';

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

describe('create', () => {
  it('', async () => {
    const firstName = 'foo';
    const lastName = 'bar';
    const streetAddress = '99/9 Bangkok Thailand';

    const mockPersonAddressModel = {
      id: 5,
      streetAddress,
    };

    const mockPersonModel = {
      id: 5,
      addressId: mockPersonAddressModel.id,
      firstName,
      lastName,
    };

    const mockCustomerModel = {
      id: 5,
      personId: mockPersonModel.id,
    };

    personAddress.create = jest.fn(() => Promise.resolve(mockPersonAddressModel));
    person.create = jest.fn(() => Promise.resolve(mockPersonModel));
    domains.customer.create = jest.fn(() => Promise.resolve(mockCustomerModel));

    const result = await customer.create({ firstName, lastName, streetAddress });
    expect(personAddress.create).toBeCalled();
    expect(person.create).toBeCalled();
    expect(domains.customer.create).toBeCalled();
    
  });
});
