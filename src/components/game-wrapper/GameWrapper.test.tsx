import { render, screen } from '@testing-library/react';
import GameWrapper from './GameWrapper';
import Loading from '@/components/loading/Loading';
import Game from '@/components/mathler/game/Game';
import Mathler from '@/game/Mathler';

jest.mock('@/game/Mathler', () => ({
  newGame: jest.fn(),
}));

jest.mock('@/components/loading/Loading');
jest.mock('@/components/mathler/game/Game');

describe('GameWrapper', () => {
  it('renders', () => {
    render(<GameWrapper />);

    expect(Loading).toHaveBeenCalled();
    expect(Game).toHaveBeenCalled();
    expect(Mathler.newGame).toHaveBeenCalled();
  });
});
