import GameState from '../GameState';

/** Set of supported operators */
export const operators = new Set<string>(['+', '-', '*', '/']);

/** All supported generators */
export enum GeneratorType {
  TEST = 'test',
  RANDOM = 'random',
}

/** Expression used for testing */
export const testExpression = '12+3*1';

/** The default new game state */
export const defaultNewGame: GameState = {
  guesses: [],
  maxGuesses: 6,
  target: 15,
  solution: testExpression,
  completed: false,
};
