import GameState from './GameState';
import * as validation from './util/validation';

/** Standalone Mathler game engine */
namespace Mathler {
  // Declare imported util
  export type GuessValidation = validation.GuessValidation;
  export import GuessError = validation.GuessError;

  export const operators = new Set<string>([
    '+', '-', '*', '/'
  ]);

  /** Creates a new game */
  export const newGame = (options?: {}): GameState => {

    // Use dummy state for now until I write the generator code
    return {
      guesses: [],
      maxGuesses: 6,
      target: 15,
      solution: '12+3*1',
      completed: false
    }
  };

  /** Guess an expression */
  export const guess = (guess: string, state: GameState): GameState => {
    if (state.completed === true || 
        state.guesses.length == state.maxGuesses) {
      return state;
    }

    // TODO: Deal with expression parsing and symbolic equals later
    if (guess === state.solution) {
      state.completed = true;
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
      let value = parseInt(eval(guess));
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