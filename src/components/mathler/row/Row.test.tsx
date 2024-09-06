import { render, screen } from '@testing-library/react';
import Row, { RowProps } from './Row';
import { DisplayState } from '../util/constants';
import Tile from '@/components/mathler/tile/Tile';

jest.mock('@/components/mathler/tile/Tile', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Row', () => {
  let rowProps: RowProps;

  beforeEach(() => {
    jest.clearAllMocks();

    rowProps = {
      value: '12',
      displayStates: [DisplayState.DEFAULT, DisplayState.ABSENT],
    };
  });

  it('renders a row with correct styling', () => {
    render(<Row {...rowProps} />);

    expect(Tile).toHaveBeenCalledTimes(2);
    expect(Tile).toHaveBeenCalledWith(
      expect.objectContaining({
        text: '1',
        status: DisplayState.DEFAULT,
      }),
      expect.anything()
    );
    expect(Tile).toHaveBeenCalledWith(
      expect.objectContaining({
        text: '2',
        status: DisplayState.ABSENT,
      }),
      expect.anything()
    );
  });

  it('renders based on number of display states', () => {
    rowProps.displayStates = [];
    render(<Row {...rowProps} />);
    expect(Tile).toHaveBeenCalledTimes(0);
  });
});
