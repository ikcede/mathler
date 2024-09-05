import { getFactors } from './helpers';

describe('getFactors', () => {
  describe('default', () => {
    it('returns the correct factors for a prime number', () => {
      const result = getFactors(13);
      expect(result).toEqual([]);
    });

    it('returns the correct factors for a composite number', () => {
      const result = getFactors(6);
      expect(result).toEqual([2, 3]);
    });

    it('returns the correct factors for a perfect square', () => {
      const result = getFactors(16);
      expect(result).toEqual([2, 4, 8]);
    });

    it('handles the case where the number is 1', () => {
      const result = getFactors(1);
      expect(result).toEqual([]);
    });

    it('handles the case where the number is 0', () => {
      const result = getFactors(0);
      expect(result).toEqual([]);
    });

    it('handles the case where the number is negative', () => {
      const result = getFactors(-28);
      expect(result).toEqual([]);
    });
  });

  describe('with includeOne', () => {
    it('returns the correct factors for a prime number', () => {
      const result = getFactors(13, true);
      expect(result).toEqual([1, 13]);
    });

    it('returns the correct factors for a composite number', () => {
      const result = getFactors(6, true);
      expect(result).toEqual([1, 2, 3, 6]);
    });

    it('returns the correct factors for a perfect square', () => {
      const result = getFactors(16, true);
      expect(result).toEqual([1, 2, 4, 8, 16]);
    });

    it('handles the case where the number is 1', () => {
      const result = getFactors(1, true);
      expect(result).toEqual([1]);
    });

    it('handles the case where the number is 0', () => {
      const result = getFactors(0, true);
      expect(result).toEqual([]);
    });

    it('handles the case where the number is negative', () => {
      const result = getFactors(-28, true);
      expect(result).toEqual([]);
    });
  });
});
