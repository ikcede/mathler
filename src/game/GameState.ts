/**
 * Define the entire game state
 */
export default interface GameState {
  /** Valid guesses used by the player */
  guesses: string[]; // Expression[]

  /** Total guesses allowed */
  maxGuesses: number;

  /** The target value */
  target: number;

  /** List of target solutions */
  solution: string; //Expression[],

  /** Whether the game is over */
  completed: boolean;
}
