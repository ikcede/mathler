/** Helper method to get int factors */
export const getFactors = (num: number, includeOne = false): number[] => {
  const root = Math.sqrt(num);
  let factors = new Array<number>();
  let start = includeOne ? 1 : 2;

  for (let i = start; i <= root; i++) {
    if (num % i === 0) {
      factors.unshift(i);
      if (i !== root) {
        factors.push(num / i);
      }
    }
  }

  factors.sort((a, b) => a - b);
  return factors;
};
