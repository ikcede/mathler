import { generateExpression } from './GameGenerator';
import { GeneratorType, testExpression } from './util/constants';

jest.mock('./util/generators', () => {
  return {
    __esModule: true,
    randomExpression: jest.fn().mockReturnValue('10+5-3'),
  };
});

describe('GameGenerator', () => {
  describe('generateExpression', () => {
    it('can generate a random expression', () => {
      const result = generateExpression(GeneratorType.RANDOM);
      expect(result).toBe('10+5-3');
    });

    it('returns the test expression when another type is passed', () => {
      const result = generateExpression(GeneratorType.TEST);
      expect(result).toBe(testExpression);
    });
  });
});
