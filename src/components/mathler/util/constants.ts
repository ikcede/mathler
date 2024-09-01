
/** Defines the state of a key or tile */
export enum DisplayState {
  DEFAULT = 'default',
  CORRECT = 'correct',
  PRESENT = 'present',
  ABSENT = 'absent'
}

/** Sets up the keyboard used by the game */
export const keyboard = [
  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  ['Enter', '+', '-', '*', '/', 'Delete']
];

/** Use a set to check for special keys */
export const specialKeys = new Set([
  'Enter',
  'Delete'
]);