import { render, screen } from '@testing-library/react';
import GameWrapper from './GameWrapper';
import Loading from '@/components/loading/Loading';
import Game from '@/components/mathler/game/Game';
import Mathler from '@/game/Mathler';
import { defaultNewGame } from '@/game/util/constants';
import userEvent from '@testing-library/user-event';

jest.mock('@/game/Mathler');
jest.mock('@/components/loading/Loading');
jest.mock('@/components/mathler/game/Game');

describe('GameWrapper', () => {
  const user = userEvent.setup();

  beforeEach(() => jest.clearAllMocks());

  it('renders', () => {
    (Mathler.newGame as jest.Mock).mockReturnValue(defaultNewGame);

    render(<GameWrapper />);

    expect(Loading).toHaveBeenCalled();
    expect(Game).toHaveBeenCalledWith(
      expect.objectContaining({
        initialState: defaultNewGame,
      }),
      expect.anything()
    );
    expect(Mathler.newGame).toHaveBeenCalled();
    expect(screen.getByText('Start A New Game')).toBeInTheDocument();
  });

  it('can start new games', async () => {
    (Mathler.newGame as jest.Mock).mockReturnValue(defaultNewGame);

    render(<GameWrapper />);

    expect(Game).toHaveBeenCalledWith(
      expect.objectContaining({
        initialState: defaultNewGame,
      }),
      expect.anything()
    );
    expect(Game).toHaveBeenCalledTimes(1);

    (Mathler.newGame as jest.Mock).mockReturnValue({
      ...defaultNewGame,
      maxGuesses: 2,
    });
    await user.click(screen.getByText('Start A New Game'));

    expect(Game).toHaveBeenLastCalledWith(
      expect.objectContaining({
        initialState: { ...defaultNewGame, maxGuesses: 2 },
      }),
      expect.anything()
    );
    expect(Game).toHaveBeenCalledTimes(2);
  });
});
