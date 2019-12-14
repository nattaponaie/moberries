import {
  product,
} from 'api/v1.0/business-logics';

import * as domains from 'api/v1.0/domains';

describe('findProductByName', () => {
  it('should return product model', async () => {
    const name = 'margarita';

    const mockProductModel = {
      id: 1,
      name,
      description: 'A margarita is a cocktail consisting of tequila, orange liqueur, and lime juice',
    };

    domains.product.findProductByName = jest.fn(() => Promise.resolve(mockProductModel));
    const result = await product.findProductByName({ name });
    expect(result).toMatchObject(mockProductModel);
  });
});
