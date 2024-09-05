import GameState from './GameState';
import Mathler from './Mathler';
import * as Gen from './GameGenerator';
import { defaultNewGame, GeneratorType } from './util/constants';
import { GuessError } from './util/validation';

jest.mock('./GameGenerator', () => ({
  __esModule: true,
  generateExpression: jest.fn(),
}));

describe('Mathler', () => {
  let testGameState: GameState;

  beforeEach(() => {
    testGameState = { ...defaultNewGame };
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

    test('on a game with capped guesses', () => {
      const completedGame = {
        ...testGameState,
        guesses: ['1', '1', '1', '1', '1', '1'],
      };
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

    test('completes the game on the last guess', () => {
      const completedGame = {
        ...testGameState,
        guesses: ['1', '1', '1', '1', '1'],
      };
      const result = Mathler.guess('10+3+2', completedGame);
      expect(result).toEqual({
        ...completedGame,
        guesses: ['1', '1', '1', '1', '1', '10+3+2'],
        completed: true,
      });
    });

    test('guessing the solution completes the game', () => {
      const gameState = {
        ...testGameState,
        guesses: ['1'],
      };
      const result = Mathler.guess(gameState.solution, gameState);
      expect(result).toEqual({
        ...gameState,
        guesses: ['1', gameState.solution],
        completed: true,
      });
    });
  });

  describe('newGame', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should generate a random game by default', () => {
      (Gen.generateExpression as jest.Mock).mockReturnValue('1+1');

      const result = Mathler.newGame();
      expect(result).toEqual({
        ...testGameState,
        solution: '1+1',
        target: 2,
      });
      expect(Gen.generateExpression).toHaveBeenCalledWith(
        GeneratorType.RANDOM
      );
    });

    it('should set max guesses if the option is set', () => {
      (Gen.generateExpression as jest.Mock).mockReturnValue('1+1');

      const result = Mathler.newGame({
        maxGuesses: 3,
      });
      expect(result).toEqual({
        ...testGameState,
        solution: '1+1',
        target: 2,
        maxGuesses: 3,
      });
      expect(Gen.generateExpression).toHaveBeenCalledTimes(1);
    });

    it('should build a game with a custom solution', () => {
      const result = Mathler.newGame({
        solution: '1+1',
      });
      expect(result).toEqual({
        ...testGameState,
        solution: '1+1',
        target: 2,
      });
      expect(Gen.generateExpression).toHaveBeenCalledTimes(0);
    });

    it('should be able to use the test generator', () => {
      (Gen.generateExpression as jest.Mock).mockReturnValue('1+1');

      const result = Mathler.newGame({
        generator: GeneratorType.TEST,
      });
      expect(result).toEqual({
        ...testGameState,
        solution: '1+1',
        target: 2,
      });
      expect(Gen.generateExpression).toHaveBeenCalledWith(
        GeneratorType.TEST
      );
    });
  });

  describe('isGameWon', () => {
    it('returns false with no guesses', () => {
      expect(Mathler.isGameWon(testGameState)).toBe(false);
    });

    it('returns false if the game is not completed', () => {
      testGameState = {
        ...testGameState,
        guesses: [testGameState.solution],
      };
      expect(Mathler.isGameWon(testGameState)).toBe(false);
    });

    it('returns true if the last guess is the solution', () => {
      testGameState = {
        ...testGameState,
        completed: true,
        guesses: [testGameState.solution],
      };
      expect(Mathler.isGameWon(testGameState)).toBe(true);
    });
  });
});
