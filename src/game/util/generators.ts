import { isPrime, evaluate, pickRandom, randomInt } from 'mathjs';
import { getFactors } from './helpers';

/**
 * Procedurally generate a random expression of length 6
 */
export const randomExpression = (): string => {
  // Generate two random operators
  let generatedOperators = [
    pickRandom(['+', '-', '/']),
    pickRandom(['+', '-', '*']),
  ];

  let a = randomInt(10, 100);
  let b = 0,
    c = 0;

  // Ensure that divisions end in ints
  if (generatedOperators[0] === '/') {
    if (isPrime(a)) {
      a += 1;
    }
    let factors = getFactors(a).filter((factor) => factor < 10);
    b = pickRandom(factors);
  } else {
    b = randomInt(0, 10);
  }

  // Ensure that we don't get a negative number
  if (generatedOperators[1] === '-') {
    let calc = evaluate(a + generatedOperators[0] + b);
    c = randomInt(0, Math.min(calc + 1, 10));
  } else {
    c = randomInt(0, 10);
  }

  return a + generatedOperators[0] + b + generatedOperators[1] + c;
};
