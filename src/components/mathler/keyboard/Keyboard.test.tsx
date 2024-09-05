import { fireEvent, render, screen } from '@testing-library/react';
import Keyboard, { KeyboardProps } from './Keyboard';
import styling from './Keyboard.module.css';
import { DisplayState } from '../util/constants';
import userEvent from '@testing-library/user-event';

let keyboardProps: KeyboardProps;

describe('Keyboard', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    keyboardProps = {
      keyboard: [['0'], ['Enter']],
      onKeyInput: jest.fn(),
    };
  });

  it('renders a keyboard', () => {
    render(<Keyboard {...keyboardProps} />);

    let keys = screen.getAllByRole('button');
    expect(keys).toHaveLength(2);

    expect(keys[0]).toHaveTextContent('0');
    expect(keys[1]).toHaveTextContent('Enter');

    expect(keys[0]).toHaveClass(styling[DisplayState.DEFAULT]);
    expect(keys[1]).toHaveClass(styling[DisplayState.DEFAULT]);
  });

  it('renders keys with different states', () => {
    let displayMap = new Map<string, DisplayState>();
    displayMap.set('0', DisplayState.CORRECT);
    keyboardProps.keyStates = displayMap;

    render(<Keyboard {...keyboardProps} />);

    let keys = screen.getAllByRole('button');
    expect(keys).toHaveLength(2);

    expect(keys[0]).toHaveClass(styling[DisplayState.CORRECT]);
    expect(keys[1]).toHaveClass(styling[DisplayState.DEFAULT]);
  });

  it('sends a keyinput event', async () => {
    let onKeyInput = keyboardProps.onKeyInput;
    render(<Keyboard {...keyboardProps} />);

    let keys = screen.getAllByRole('button');
    expect(onKeyInput).toHaveBeenCalledTimes(0);

    await user.click(keys[0]);
    expect(onKeyInput).toHaveBeenCalledTimes(1);
    expect(onKeyInput).toHaveBeenCalledWith('0');

    await user.click(keys[1]);
    expect(onKeyInput).toHaveBeenCalledTimes(2);
    expect(onKeyInput).toHaveBeenCalledWith('Enter');
  });
});
