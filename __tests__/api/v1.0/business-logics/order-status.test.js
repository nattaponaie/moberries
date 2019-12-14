import {
  orderStatus,
} from 'api/v1.0/business-logics';

import { InvalidError } from 'utils/error';

describe('transformStatusToId', () => {
  it('should return correct status ID when input is lowercase', async () => {
    const status = 'preparing';

    const mockResult = 1;

    const result = orderStatus.transformStatusToId(status);
    expect(result).toEqual(mockResult);
    
  });

  it('should return correct status ID when input is not lowercase', async () => {
    const status = 'Preparing';

    const mockResult = 1;

    const result = orderStatus.transformStatusToId(status);
    expect(result).toEqual(mockResult);
    
  });

  it('should throw error when status does not exist', async () => {
    const status = 'starting';
    expect(() => orderStatus.transformStatusToId(status)).toThrow(new InvalidError(orderStatus.ERRORS_STATUS_NOT_FOUND));
  });
});

describe('transformStatusToName', () => {
  it('should return correct status name', async () => {
    const status = '0';

    const mockResult = 'new';

    const result = orderStatus.transformStatusToName(status);
    expect(result).toEqual(mockResult);
    
  });

  it('should throw error when status name does not exist', async () => {
    const status = '5';
    expect(() => orderStatus.transformStatusToName(status)).toThrow(new InvalidError(orderStatus.ERRORS_STATUS_NOT_FOUND));
  });
});
