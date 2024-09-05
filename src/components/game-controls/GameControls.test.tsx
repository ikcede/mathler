import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameControls from './GameControls';

jest.mock('@/components/dialog/InstructionsDialog');

describe('GameControls', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    render(<GameControls />);

    expect(screen.getByText('Game mode: Normal')).toBeInTheDocument();
    expect(screen.getByLabelText('instructions')).toBeInTheDocument();

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('opens and closes instructions', async () => {
    render(<GameControls />);

    await user.click(screen.getByLabelText('instructions'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByTestId('mock-dialog-close'));
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
