import { render, screen } from '@testing-library/react';
import Key, { KeyProps } from './Key';
import styling from './Key.module.css';
import { DisplayState } from '../util/constants';
import userEvent from '@testing-library/user-event';

let keyProps: KeyProps;

describe('Key', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    keyProps = {
      keyText: '0',
    };
  });

  it('renders a key with default styling', () => {
    render(<Key {...keyProps} />);
    expect(screen.getByRole('button')).toHaveTextContent(keyProps.keyText);
    expect(screen.getByRole('button')).toHaveClass(
      styling[DisplayState.DEFAULT]
    );
  });

  it('renders a display state class', () => {
    keyProps.display = DisplayState.ABSENT;
    render(<Key {...keyProps} />);
    expect(screen.getByRole('button')).toHaveClass(
      styling[DisplayState.ABSENT]
    );
  });

  it('sends a keypress event', async () => {
    let onKeyPressed = (keyProps.onKeyPressed = jest.fn());
    render(<Key {...keyProps} />);

    expect(onKeyPressed).toHaveBeenCalledTimes(0);
    await user.click(screen.getByRole('button'));

    expect(onKeyPressed).toHaveBeenCalledTimes(1);
    expect(onKeyPressed).toHaveBeenCalledWith(keyProps.keyText);
  });

  it('handles the default onKeyPressed without errors', async () => {
    render(<Key {...keyProps} />);
    const button = screen.getByRole('button');

    await user.click(screen.getByRole('button'));
    // No assertion needed, just ensuring no error occurs
  });
});
