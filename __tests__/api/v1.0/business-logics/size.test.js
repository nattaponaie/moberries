import {
  size,
} from 'api/v1.0/business-logics';

import * as domains from 'api/v1.0/domains';

import { InvalidError } from 'utils/error';

describe('transformSize', () => {
  it('should return 0 when size equal to small', () => {
    const productSize = 'small';
    const result = size.transformSize(productSize);
    expect(result).toEqual(0);
  });

  it('should return 1 when size equal to medium', () => {
    const productSize = 'medium';
    const result = size.transformSize(productSize);
    expect(result).toEqual(1);
  });

  it('should return 2 when size equal to large', () => {
    const productSize = 'large';
    const result = size.transformSize(productSize);
    expect(result).toEqual(2);
  });

  it('should throw error when size does not exist', () => {
    const productSize = 'extra';
    expect(() => size.transformSize(productSize)).toThrow(new InvalidError(size.ERROR_PRODUCT_SIZE_DOES_NOT_EXIST));
  });
});

describe('findSizeByProductIdAndSizeId', () => {
  it('should return size model', async () => {
    const productId = 17;
    const sizeId = 2;

    const mockSizeModel = {
      id: sizeId,
      size: 1,
      productId,
      priceId: 1,
    };

    domains.size.findSizeByProductIdAndSizeId = jest.fn(() => Promise.resolve(mockSizeModel));

    const result = await size.findSizeByProductIdAndSizeId({ productId, sizeId });
    expect(result).toMatchObject(mockSizeModel);
    
  });
});

describe('findSizeByProductIdAndSize', () => {
  it('should return size model', async () => {
    const productId = 17;
    const productSize = 'medium';

    const mockSizeModel = {
      id: 2,
      size: 1,
      productId,
      priceId: 1,
    };

    size.transformSize = jest.fn(() => 1);
    domains.size.findSizeByProductIdAndSize = jest.fn(() => Promise.resolve(mockSizeModel));

    const result = await size.findSizeByProductIdAndSize({ productId, productSize });
    expect(result).toMatchObject(mockSizeModel);
    
  });
});
