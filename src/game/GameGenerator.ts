import { GeneratorType, testExpression } from './util/constants';
import { randomExpression } from './util/generators';

/** Generates an expression based on the [GeneratorType] */
export const generateExpression = (type: GeneratorType) => {
  if (type === GeneratorType.RANDOM) {
    return randomExpression();
  }
  return testExpression;
};
