import { fireEvent, render, screen } from '@testing-library/react';
import InstructionsDialog from './InstructionsDialog';
import DialogProps from './DialogProps';

let dialogProps: DialogProps;

describe('InstructionsDialog', () => {
  beforeEach(() => {
    dialogProps = {
      open: false,
      onClose: jest.fn(),
    };
  });

  it('renders closed', () => {
    render(<InstructionsDialog {...dialogProps} />);
    expect(screen.queryAllByRole('dialog')).toHaveLength(0);
  });

  it('renders open', () => {
    dialogProps.open = true;
    render(<InstructionsDialog {...dialogProps} />);
    expect(screen.getByText('How To Play')).toBeInTheDocument();
    expect(screen.getByTestId('CloseIcon')).toBeInTheDocument();
  });

  it('closes on X click', () => {
    dialogProps.open = true;
    render(<InstructionsDialog {...dialogProps} />);

    expect(dialogProps.onClose).toHaveBeenCalledTimes(0);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(dialogProps.onClose).toHaveBeenCalledTimes(1);
  });
});
