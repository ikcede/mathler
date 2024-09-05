import GameState from './GameState';
import Mathler from './Mathler';
import { GuessError } from './util/validation';

describe('Mathler', () => {
  let testGameState: GameState;

  beforeEach(() => {
    testGameState = {
      guesses: [],
      maxGuesses: 6,
      target: 15,
      solution: '12+3*1',
      completed: false,
    };
  });

  describe('validate', () => {
    test('empty guess', () => {
      const result = Mathler.validate('', testGameState);
      expect(result.valid).toBe(false);
      expect(result.error).toBe(GuessError.INPUT_LENGTH);
    });

    test('short guess', () => {
      const result = Mathler.validate('1', testGameState);
      expect(result.valid).toBe(false);
      expect(result.error).toBe(GuessError.INPUT_LENGTH);
    });

    test('operator start', () => {
      const result = Mathler.validate('+12345', testGameState);
      expect(result.valid).toBe(false);
      expect(result.error).toBe(GuessError.OPERATOR_START);
    });

    test('operator end', () => {
      const result = Mathler.validate('12345-', testGameState);
      expect(result.valid).toBe(false);
      expect(result.error).toBe(GuessError.OPERATOR_START);
    });

    test('divide by zero', () => {
      const result = Mathler.validate('0/0*12', testGameState);
      expect(result.valid).toBe(false);
      expect(result.error).toBe(GuessError.BAD_COMPUTATION);
    });

    test('operators messed up', () => {
      const result = Mathler.validate('0/*112', testGameState);
      expect(result.valid).toBe(false);
      expect(result.error).toBe(GuessError.DEFAULT);
    });

    test('valid value', () => {
      const result = Mathler.validate('10+3+2', testGameState);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  describe('guess', () => {
    test('on a completed game', () => {
      const completedGame = { ...testGameState, completed: true };
      const result = Mathler.guess('10+3+2', completedGame);
      expect(result).toEqual(completedGame);
    });

    test('on a game with maxed out guesses', () => {
      const completedGame = {
        ...testGameState,
        maxGuesses: 1,
        guesses: [''],
      };
      const result = Mathler.guess('10+3+2', completedGame);
      expect(result).toEqual(completedGame);
    });

    test('with an invalid guess', () => {
      const guess = '10+3+2';
      const result = Mathler.guess(guess, testGameState);
      expect(result).toEqual({ ...testGameState, guesses: [guess] });
    });

    test('with the solution', () => {
      const result = Mathler.guess(testGameState.solution, testGameState);
      expect(result).toEqual({
        ...testGameState,
        guesses: [testGameState.solution],
        completed: true,
      });
    });

    test('with a commutative solution', () => {
      const guess = '3*1+12';
      const result = Mathler.guess(guess, testGameState);
      expect(result).toEqual({
        ...testGameState,
        guesses: [testGameState.solution],
        completed: true,
      });
    });
  });
});
