import { isPrime, evaluate } from 'mathjs';
import { randRange, randFrom, getFactors } from './util/helpers';

export const generateExpression = (type: string, seed?: number) => {
  if (type === 'random') {
    return generateRandomExpression(seed);
  }
  return '12+3*1';
};

/**
 * Contains helpers to generate valid games of Mathler
 */
export const generateRandomExpression = (seed?: number): string => {
  // Generate two random operators
  let generatedOperators = [
    randFrom(['+', '-', '/']),
    randFrom(['+', '-', '*']),
  ];

  let a = randRange(10, 100);
  let b = 0,
    c = 0;

  // Ensure that divisions end in ints
  if (generatedOperators[0] === '/') {
    if (isPrime(a)) {
      a += 1;
    }
    let factors = getFactors(a);
    b = randFrom(factors);
  } else {
    b = randRange(0, 10);
  }

  // Ensure that we don't get a negative number
  if (generatedOperators[1] === '-') {
    let calc = evaluate(a + generatedOperators[0] + b);
    c = randRange(0, Math.min(calc + 1, 10));
  } else {
    c = randRange(0, 10);
  }

  return a + generatedOperators[0] + b + generatedOperators[1] + c;
};
