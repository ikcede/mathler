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
  export import operators = constants.operators;

  export interface GameOptions {
    maxGuesses?: number,
    solution?: string,
    generator?: string,
    seed?: number,
  }

  /** Creates a new game */
  export const newGame = (options?: GameOptions): GameState => {
    const newGameState: GameState = {
      guesses: [],
      maxGuesses: options?.maxGuesses ?? 6,
      target: 15,
      solution: '12+3*1',
      completed: false
    };

    if (options !== undefined && options.solution !== undefined) {
      return Object.assign(newGameState, {
        solution: options.solution,
        target: evaluate(options.solution),
      });
    }

    let generator = options?.generator ?? 'random';
    let solution = generateExpression(generator, options?.seed);

    return Object.assign(newGameState, {
      solution: solution,
      target: evaluate(solution),
    });
  };

  /** Guess an expression */
  export const guess = (guess: string, state: GameState): GameState => {
    if (state.completed === true || 
        state.guesses.length == state.maxGuesses) {
      return state;
    }

    if (guess === state.solution) {
      state.completed = true;
    } else {
      // Check for commutative
      let simplified = guess.split('').toSorted().join('');
      let simplifiedSolution = state.solution.split('').toSorted().join('');
      if (simplified === simplifiedSolution) {
        guess = state.solution;
        state.completed = true;
      }
    }

    state.guesses = [...state.guesses, guess];

    return {...state};
  }

  /** Validate an expression */
  export const validate = (
    guess: string,
    target: number
  ): GuessValidation => {
    if (guess.length !== 6) {
      return {
        valid: false,
        error: GuessError.INPUT_LENGTH
      };
    }

    if (operators.has(guess[0]) || operators.has(guess[5])) {
      return {
        valid: false,
        error: GuessError.OPERATOR_START
      };
    }

    try {
      let value = evaluate(guess);
      if (value === target) {
        return {
          valid: true
        };
      }

      return {
        valid: false,
        error: GuessError.BAD_COMPUTATION
      }
    } catch {
      return {
        valid: false,
        error: GuessError.DEFAULT
      };
    }
  }
}

export default Mathler;