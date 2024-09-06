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
import { enqueueSnackbar } from 'notistack';
import { GuessError } from '@/game/util/validation';

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
jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  enqueueSnackbar: jest.fn(),
}));

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

  it('will show errors if guess does not pass validation', async () => {
    gameProps.initialState = middleGameState;
    render(<Game {...gameProps} />);

    await user.keyboard('{Enter}');
    expect(enqueueSnackbar).toHaveBeenCalledWith(
      GuessError.INPUT_LENGTH,
      expect.objectContaining({
        variant: 'error',
      })
    );
  });

  it('will update the active guess on key input', async () => {
    gameProps.initialState = middleGameState;
    render(<Game {...gameProps} />);

    expect(Row).toHaveBeenCalledTimes(3);
    await user.keyboard('1');
    expect(Row).toHaveBeenCalledTimes(6);
    expect(Row).toHaveBeenCalledWith(
      expect.objectContaining({
        value: '1',
        displayStates: new Array(newGameState.solution.length).fill(
          DisplayState.DEFAULT
        ),
      }),
      expect.anything()
    );
  });

  it('will not update the active guess on max input', async () => {
    gameProps.initialState = middleGameState;
    render(<Game {...gameProps} />);

    expect(Row).toHaveBeenCalledTimes(3);
    await user.keyboard('12345');
    expect(Row).toHaveBeenCalledTimes(3 * 6);

    await user.keyboard('1');
    expect(Row).toHaveBeenCalledTimes(3 * 6);
  });

  it('can delete the last tile', async () => {
    gameProps.initialState = middleGameState;
    render(<Game {...gameProps} />);

    await user.keyboard('12');
    jest.clearAllMocks();

    expect(Row).toHaveBeenCalledTimes(0);
    await user.keyboard('{Backspace}');

    expect(Row).toHaveBeenCalledWith(
      expect.objectContaining({
        value: '1',
        displayStates: new Array(newGameState.solution.length).fill(
          DisplayState.DEFAULT
        ),
      }),
      expect.anything()
    );
  });

  it('can make a guess', async () => {
    gameProps.initialState = middleGameState;
    render(<Game {...gameProps} />);

    await user.keyboard('3/3+2');
    jest.clearAllMocks();

    await user.keyboard('{Enter}');
    expect(Row).toHaveBeenCalledTimes(3);
    expect(Row).toHaveBeenCalledWith(
      expect.objectContaining({
        value: '3/3+2',
        displayStates: [
          DisplayState.ABSENT,
          DisplayState.ABSENT,
          DisplayState.ABSENT,
          DisplayState.CORRECT,
          DisplayState.ABSENT,
        ],
      }),
      expect.anything()
    );

    // Keyboard values should be updated too
    let expectedKeyMap = new Map<string, string>();
    expectedKeyMap.set('3', DisplayState.ABSENT);
    expectedKeyMap.set('/', DisplayState.ABSENT);
    expectedKeyMap.set('2', DisplayState.ABSENT);
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

  it('can win the game', async () => {
    gameProps.initialState = newGameState;
    render(<Game {...gameProps} />);

    await user.keyboard('1+1+1');
    jest.clearAllMocks();

    await user.keyboard('{Enter}');
    expect(Row).toHaveBeenCalledTimes(3);
    expect(Row).toHaveBeenCalledWith(
      expect.objectContaining({
        value: '1+1+1',
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

    // Win notification should show
    expect(enqueueSnackbar).toHaveBeenCalledWith(
      'Congrats, you found the solution!',
      expect.objectContaining({
        variant: 'success',
      })
    );

    // Keyboard values should be updated too
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

  it('can lose the game', async () => {
    gameProps.initialState = middleGameState;
    render(<Game {...gameProps} />);

    await user.keyboard('4-2+1');
    await user.keyboard('{Enter}');
    await user.keyboard('4-2+1');
    await user.keyboard('{Enter}');

    // Lose notification should show
    expect(enqueueSnackbar).toHaveBeenCalledWith(
      'Sorry, you ran out of guesses',
      expect.objectContaining({
        variant: 'error',
      })
    );
  });
});
