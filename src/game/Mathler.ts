import GameState from './GameState';

export const operators = new Set<string>([
  '+', '-', '*', '/'
]);

export type GuessValidation = {
  valid: boolean,
  error?: string,
};

/** Creates a new game */
export const newGame = (options: {}): GameState => {

  // Use dummy state for now until I write the generator code
  return {
    guesses: [],
    maxGuesses: 6,
    target: 12,
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

  state.guesses.push(guess);

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
      error: 'Invalid input length'
    };
  }

  if (operators.has(guess[0]) || operators.has(guess[5])) {
    return {
      valid: false,
      error: 'Guess cannot start or end with an operator'
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
      error: 'Guess does not compute to ' + target
    }
  } catch {
    return {
      valid: false,
      error: 'Error in expression'
    };
  }
}