import { fireEvent, render, screen } from '@testing-library/react';
import Game, { GameProps } from './Game';
import GameState from '@/game/GameState';

let gameProps: GameProps;

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

describe('Game', () => {
  beforeEach(() => {
    gameProps = {
      initialState: newGameState,
    };
  });

  it('renders a new game', () => {
    render(<Game {...gameProps} />);

    let instructions = screen.getByText('Find the hidden calculation');
    expect(instructions).toBeInTheDocument();
  });
});
