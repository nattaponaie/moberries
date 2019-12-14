import {
  payment,
} from 'api/v1.0/business-logics';

describe('calculatePrice', () => {
  it('should return correct price', async () => {
    const x = 100;
    const y = 10;
    const quantity = 50;

    const mockResult = 600;

    const result = payment.calculatePrice({ x, y, quantity });
    expect(result).toEqual(mockResult);
    
  });
});
