import { transformObjectToCamel, transformToCamelCaseKey, apiResponse } from 'utils/json';

describe('util:transformObjectToCamel', () => {
  it('should transform object to camel case', () => {
    const sampleObject = {
      created_at: 'now',
      deleted_at: 'now',
      updated_at: 'now',
    };
    const result = transformObjectToCamel(sampleObject);
    expect(result).toEqual({
      createdAt: 'now',
      deletedAt: 'now',
      updatedAt: 'now',
    });
  });
});

describe('util:transformToCamelCaseKey', () => {
  it('should transform object to camel case', () => {
    const sampleObject = {
      created_at: 'now',
      deleted_at: 'now',
      updated_at: 'now',
    };
    const result = transformToCamelCaseKey(sampleObject);
    expect(result).toEqual({
      createdAt: 'now',
      deletedAt: 'now',
      updatedAt: 'now',
    });
  });

  it('should transform array of object to camel case', () => {
    const sampleObject = [
      {
        created_at: 'now',
        deleted_at: 'now',
        updated_at: 'now',
      },
      {
        created_at: 'yesterday',
        deleted_at: 'yesterday',
        updated_at: 'yesterday',
      },
    ];
    const result = transformToCamelCaseKey(sampleObject);
    expect(result).toEqual([
      {
        createdAt: 'now',
        deletedAt: 'now',
        updatedAt: 'now',
      },
      {
        createdAt: 'yesterday',
        deletedAt: 'yesterday',
        updatedAt: 'yesterday',
      },
    ]);
  });
});

describe('response', () => {
  describe('apiResponse', () => {
    it('should return valid data.', async () => {
      const input = {
        order: {
          customerId: 99,
          orderStatusId: 0,
        },
      };
      const result = await apiResponse({ resource: 'order', response: input });
      expect(result).toHaveProperty(['resource']);
      expect(result.resource).toBe('order');
      expect(result).toHaveProperty(['attributes']);
      expect(result.attributes).toEqual(input);
    });
  });
});
