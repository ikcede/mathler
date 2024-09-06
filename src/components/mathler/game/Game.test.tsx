import { render, screen } from '@testing-library/react';
import Game, { GameProps } from './Game';
import GameState from '@/game/GameState';
import userEvent from '@testing-library/user-event';
import Row from '@/components/mathler/row/Row';
import Keyboard from '@/components/mathler/keyboard/Keyboard';
import {
  DisplayState,
  keyboard,
} from '@/components/mathler/util/constants';

const newGameState: GameState = {
  guesses: [],
  maxGuesses: 3,
  target: 3,
  solution: '1+1+1',
  completed: false,
};

const middleGameState: GameState = {
  guesses: ['4-2+1'],
  maxGuesses: 3,
  target: 3,
  solution: '1+1+1',
  completed: false,
};

const completedGameState: GameState = {
  guesses: ['4-2+1', '1+1+1'],
  maxGuesses: 3,
  target: 3,
  solution: '1+1+1',
  completed: true,
};

/** Mock memod Row */
jest.mock('@/components/mathler/row/Row', () => ({
  __esModule: true,
  default: jest.fn(),
}));

/** Mock memod Keyboard */
jest.mock('@/components/mathler/keyboard/Keyboard', () => ({
  __esModule: true,
  default: jest.fn(),
}));

/** Mock notification snackbar */
jest.mock('notistack');

describe('Game', () => {
  let gameProps: GameProps;

  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    gameProps = {
      initialState: newGameState,
    };
  });

  it('renders a new game', () => {
    render(<Game {...gameProps} />);

    let instructions = screen.getByText('Find the hidden calculation');
    expect(instructions).toBeInTheDocument();

    // It should print the correct number of rows and tiles
    expect(Row).toHaveBeenCalledTimes(newGameState.maxGuesses);
    expect(Row).toHaveBeenCalledWith(
      expect.objectContaining({
        value: '',
        displayStates: new Array(newGameState.solution.length).fill(
          DisplayState.DEFAULT
        ),
      }),
      expect.anything()
    );

    // It should print the keyboard
    expect(Keyboard).toHaveBeenCalledWith(
      expect.objectContaining({
        keyboard: keyboard,
        keyStates: new Map(),
        onKeyInput: expect.anything(),
      }),
      expect.anything()
    );
  });

  it('renders a mid game', () => {
    gameProps.initialState = middleGameState;
    render(<Game {...gameProps} />);

    let instructions = screen.getByText('Find the hidden calculation');
    expect(instructions).toBeInTheDocument();

    // It should print the correct number of rows and tiles
    expect(Row).toHaveBeenCalledTimes(newGameState.maxGuesses);
    expect(Row).toHaveBeenCalledWith(
      expect.objectContaining({
        value: middleGameState.guesses[0],
        displayStates: [
          DisplayState.ABSENT,
          DisplayState.ABSENT,
          DisplayState.ABSENT,
          DisplayState.CORRECT,
          DisplayState.CORRECT,
        ],
      }),
      expect.anything()
    );
    expect(Row).toHaveBeenCalledWith(
      expect.objectContaining({
        value: '',
        displayStates: new Array(newGameState.solution.length).fill(
          DisplayState.DEFAULT
        ),
      }),
      expect.anything()
    );

    // It should print the keyboard
    let expectedKeyMap = new Map<string, string>();
    expectedKeyMap.set('4', DisplayState.ABSENT);
    expectedKeyMap.set('2', DisplayState.ABSENT);
    expectedKeyMap.set('1', DisplayState.CORRECT);
    expectedKeyMap.set('+', DisplayState.CORRECT);

    expect(Keyboard).toHaveBeenCalledWith(
      expect.objectContaining({
        keyboard: keyboard,
        keyStates: expectedKeyMap,
        onKeyInput: expect.anything(),
      }),
      expect.anything()
    );
  });

  it('renders a completed game', () => {
    gameProps.initialState = completedGameState;
    render(<Game {...gameProps} />);

    let instructions = screen.getByText('Find the hidden calculation');
    expect(instructions).toBeInTheDocument();

    // It should print the correct number of rows and tiles
    expect(Row).toHaveBeenCalledTimes(newGameState.maxGuesses);
    expect(Row).toHaveBeenCalledWith(
      expect.objectContaining({
        value: completedGameState.guesses[0],
        displayStates: [
          DisplayState.ABSENT,
          DisplayState.ABSENT,
          DisplayState.ABSENT,
          DisplayState.CORRECT,
          DisplayState.CORRECT,
        ],
      }),
      expect.anything()
    );
    expect(Row).toHaveBeenCalledWith(
      expect.objectContaining({
        value: completedGameState.guesses[1],
        displayStates: [
          DisplayState.CORRECT,
          DisplayState.CORRECT,
          DisplayState.CORRECT,
          DisplayState.CORRECT,
          DisplayState.CORRECT,
        ],
      }),
      expect.anything()
    );
    expect(Row).toHaveBeenCalledWith(
      expect.objectContaining({
        value: '',
        displayStates: new Array(newGameState.solution.length).fill(
          DisplayState.DEFAULT
        ),
      }),
      expect.anything()
    );

    // It should print the keyboard
    expect(Keyboard).toHaveBeenCalledWith(
      expect.objectContaining({
        keyboard: keyboard,
        keyStates: new Map(),
        onKeyInput: expect.anything(),
      }),
      expect.anything()
    );
  });

  it('marks repeated values present', () => {
    // Use an improper guess just for testing
    gameProps.initialState = { ...middleGameState, guesses: ['111++'] };
    render(<Game {...gameProps} />);

    let instructions = screen.getByText('Find the hidden calculation');
    expect(instructions).toBeInTheDocument();

    // It should print the correct number of rows and tiles
    expect(Row).toHaveBeenCalledTimes(newGameState.maxGuesses);
    expect(Row).toHaveBeenCalledWith(
      expect.objectContaining({
        value: '111++',
        displayStates: [
          DisplayState.CORRECT,
          DisplayState.PRESENT,
          DisplayState.CORRECT,
          DisplayState.CORRECT,
          DisplayState.PRESENT,
        ],
      }),
      expect.anything()
    );

    // Keyboard values should still be correct if there's one correct
    let expectedKeyMap = new Map<string, string>();
    expectedKeyMap.set('1', DisplayState.CORRECT);
    expectedKeyMap.set('+', DisplayState.CORRECT);

    expect(Keyboard).toHaveBeenCalledWith(
      expect.objectContaining({
        keyboard: keyboard,
        keyStates: expectedKeyMap,
        onKeyInput: expect.anything(),
      }),
      expect.anything()
    );
  });

  it('Marks extra values as absent', () => {
    // Use an improper guess just for testing
    gameProps.initialState = { ...middleGameState, guesses: ['11+11'] };
    render(<Game {...gameProps} />);

    let instructions = screen.getByText('Find the hidden calculation');
    expect(instructions).toBeInTheDocument();

    // It should print the correct number of rows and tiles
    expect(Row).toHaveBeenCalledTimes(newGameState.maxGuesses);
    expect(Row).toHaveBeenCalledWith(
      expect.objectContaining({
        value: '11+11',
        displayStates: [
          DisplayState.CORRECT,
          DisplayState.PRESENT,
          DisplayState.PRESENT,
          DisplayState.ABSENT,
          DisplayState.CORRECT,
        ],
      }),
      expect.anything()
    );

    // Keyboard values should still be correct if there's one correct
    let expectedKeyMap = new Map<string, string>();
    expectedKeyMap.set('1', DisplayState.CORRECT);
    expectedKeyMap.set('+', DisplayState.CORRECT);

    expect(Keyboard).toHaveBeenCalledWith(
      expect.objectContaining({
        keyboard: keyboard,
        keyStates: expectedKeyMap,
        onKeyInput: expect.anything(),
      }),
      expect.anything()
    );
  });

  
});
