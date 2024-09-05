import { generateExpression } from './GameGenerator';
import GameState from './GameState';
import * as validation from './util/validation';
import * as constants from './util/constants';
import { evaluate } from 'mathjs';

/** Standalone Mathler game engine */
namespace Mathler {
  // Declare imported util
  export type GuessValidation = validation.GuessValidation;
  export import GuessError = validation.GuessError;
  export import GeneratorType = constants.GeneratorType;
  export import operators = constants.operators;

  export interface GameOptions {
    maxGuesses?: number;
    solution?: string;
    generator?: constants.GeneratorType;
  }

  /** Creates a new game */
  export const newGame = (options?: GameOptions): GameState => {
    let newGameState = { ...constants.defaultNewGame };

    if (options !== undefined) {
      if (options.maxGuesses !== undefined) {
        newGameState.maxGuesses = options.maxGuesses;
      }
      if (options.solution !== undefined) {
        newGameState.solution = options.solution;
        newGameState.target = evaluate(options.solution);
        return newGameState;
      }
    }

    let generator = options?.generator ?? constants.GeneratorType.RANDOM;
    let solution = generateExpression(generator);

    return Object.assign(newGameState, {
      solution: solution,
      target: evaluate(solution),
    });
  };

  /** Guess an expression and return the updated state */
  export const guess = (guess: string, state: GameState): GameState => {
    if (
      state.completed === true ||
      state.guesses.length >= state.maxGuesses
    ) {
      return state;
    }

    if (guess === state.solution) {
      state.completed = true;
    } else {
      // Check for commutative
      let simplified = guess.split('').toSorted().join('');
      let simplifiedSolution = state.solution
        .split('')
        .toSorted()
        .join('');
      if (simplified === simplifiedSolution) {
        guess = state.solution;
        state.completed = true;
      }
    }

    state.guesses = [...state.guesses, guess];

    if (state.guesses.length == state.maxGuesses) {
      state.completed = true;
    }

    return { ...state };
  };

  /** Validate an expression based on a [GameState] */
  export const validate = (
    guess: string,
    gameState: GameState
  ): GuessValidation => {
    if (guess.length !== gameState.solution.length) {
      return {
        valid: false,
        error: GuessError.INPUT_LENGTH,
      };
    }

    if (
      operators.has(guess[0]) ||
      operators.has(guess[guess.length - 1])
    ) {
      return {
        valid: false,
        error: GuessError.OPERATOR_START,
      };
    }

    try {
      let value = evaluate(guess);
      if (value === gameState.target) {
        return {
          valid: true,
        };
      }

      return {
        valid: false,
        error: GuessError.BAD_COMPUTATION,
      };
    } catch {
      return {
        valid: false,
        error: GuessError.DEFAULT,
      };
    }
  };

  /** Checks if a gamestate is won */
  export const isGameWon = (state: GameState) => {
    if (state.completed == false || state.guesses.length == 0) {
      return false;
    }
    return state.guesses[state.guesses.length - 1] === state.solution;
  };
}

export default Mathler;
