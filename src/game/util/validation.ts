export type GuessValidation = {
  valid: boolean;
  error?: GuessError;
};

export enum GuessError {
  INPUT_LENGTH = 'Invalid input length: all tiles must be used',
  OPERATOR_START = 'Guess cannot start or end with an operator',
  BAD_COMPUTATION = 'Check your math. The guess does not compute to the target value',
  DEFAULT = 'The provided expression does not evaluate',
}
