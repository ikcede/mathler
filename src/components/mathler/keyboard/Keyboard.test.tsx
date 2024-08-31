import { fireEvent, render, screen } from "@testing-library/react";
import Keyboard, { KeyboardProps } from './Keyboard';
import styling from './Keyboard.module.css';

let keyboardProps: KeyboardProps = {
  keyboard: [['0'], ['Enter']],
  onKeyInput: jest.fn(),
};

describe(Keyboard, () => {
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
  });

  it('sends a keyinput event', () => {
    let onKeyInput = keyboardProps.onKeyInput;
    render(<Keyboard {...keyboardProps} />);

    let keys = screen.getAllByRole('button');
    expect(onKeyInput).toHaveBeenCalledTimes(0);

    fireEvent.click(keys[0]);
    expect(onKeyInput).toHaveBeenCalledTimes(1);
    expect(onKeyInput).toHaveBeenCalledWith('0');

    fireEvent.click(keys[1]);
    expect(onKeyInput).toHaveBeenCalledTimes(2);
    expect(onKeyInput).toHaveBeenCalledWith('Enter');
  });
})
