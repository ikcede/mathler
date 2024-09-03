import { fireEvent, render, screen } from "@testing-library/react";
import InstructionsDialog, { InstructionsDialogProps } from "./InstructionsDialog";

let instructionsDialogProps: InstructionsDialogProps;

describe('InstructionsDialog', () => {
  beforeEach(() => {
    instructionsDialogProps = {
      open: false,
      onClose: jest.fn()
    };
  });

  it('renders closed', () => {
    render(<InstructionsDialog {...instructionsDialogProps} />);
    expect(screen.queryAllByRole('dialog')).toHaveLength(0);
  });

  it('renders open', () => {
    instructionsDialogProps.open = true;
    render(<InstructionsDialog {...instructionsDialogProps} />);
    expect(screen.getByText('How To Play')).toBeInTheDocument();
    expect(screen.getByTestId('CloseIcon')).toBeInTheDocument();
  });

  it('closes on X click', () => {
    instructionsDialogProps.open = true;
    render(<InstructionsDialog {...instructionsDialogProps} />);

    expect(instructionsDialogProps.onClose).toHaveBeenCalledTimes(0);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(instructionsDialogProps.onClose).toHaveBeenCalledTimes(1);
  });
})
