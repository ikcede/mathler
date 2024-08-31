import GameState from "./GameState";

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

  if (guess === state.solution) {
    state.completed = true;
  }

  state.guesses.push(guess);

  return {...state};
}

/** Validate an expression */
export const validate = (guess: string): boolean | string => {
  if (guess.length == 6) {
    return true;
  }
  return 'invalid length';
}