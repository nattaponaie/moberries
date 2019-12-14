import {
  product,
  size,
  price,
} from 'api/v1.0/business-logics';

import * as domains from 'api/v1.0/domains';
import { CustomError } from 'utils/error';

jest.mock('utils/json', () => ({
  transformSequelizeModel: jest.fn((model) => model),
}));

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

describe('create', () => {
  it('should create product successfully', async () => {
    const productList = [
      {
        name: 'fish',
        size: 'medium',
        price: 20,
        description: 'A fish',
      },
    ];

    const mockProductModel = {
      name: 'fish',
      description: 'A fish',
    };

    const mockSizeModel = {
      id: 0,
      size: 1,
      productId: 1,
    };

    const mockSizeUpdatedModel = {
      id: 0,
      size: 1,
      productId: 1,
      priceId: 0,
    };

    const mockPriceModel = {
      id: 0,
      price: 20,
      sizeId: 0,
    };

    const mockResult = [{
      product: mockProductModel,
      size: mockSizeUpdatedModel,
      price: mockPriceModel,
    }];

    domains.product.findProductByName = jest.fn(() => Promise.resolve({ }));
    domains.product.create = jest.fn(() => Promise.resolve(mockProductModel));
    size.create = jest.fn(() => Promise.resolve(mockSizeModel));
    price.create = jest.fn(() => Promise.resolve(mockPriceModel));
    size.updatePriceIdById = jest.fn(() => Promise.resolve(mockSizeUpdatedModel));

    const result = await product.create({ productList });
    expect(result).toMatchObject(expect.arrayContaining(mockResult));
    
    expect(domains.product.findProductByName).toBeCalled();
    expect(domains.product.create).toBeCalled();
    expect(size.create).toBeCalled();
    expect(price.create).toBeCalled();
    expect(size.updatePriceIdById).toBeCalled();
  });

  it('should return error when product already exist', async () => {
    const productList = [
      {
        name: 'fish',
        size: 'medium',
        price: 20,
        description: 'A fish',
      },
    ];

    const mockResult = [{
      productName: 'fish',
      error: new CustomError(product.ERROR_PRODUCT_ALREADY_EXISTS),
    }];

    domains.product.findProductByName = jest.fn(() => Promise.resolve(productList[0]));
    const result = await product.create({ productList });
    expect(result).toMatchObject(expect.arrayContaining(mockResult));
  });
});
