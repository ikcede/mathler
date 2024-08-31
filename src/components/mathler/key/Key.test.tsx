import { fireEvent, render, screen } from "@testing-library/react";
import Key, { KeyProps } from './Key';
import styling from './Key.module.css';

let keyProps: KeyProps = {
  keyText: '0',
  absent: false,
  onKeyPressed: jest.fn(),
};

describe(Key, () => {
  beforeEach(() => {
    keyProps = {
      keyText: '0',
      absent: false,
      onKeyPressed: jest.fn(),
    };
  });

  it('renders a key', () => {
    render(<Key {...keyProps} />);
    expect(screen.getByRole('button')).toHaveTextContent(keyProps.keyText);
    expect(screen.getByRole('button')).not.toHaveClass(styling.absent);
  });

  it('renders absent', () => {
    keyProps.absent = true;
    render(<Key {...keyProps} />);
    expect(screen.getByRole('button')).toHaveClass(styling.absent);
  });

  it('sends a keypress event', () => {
    let onKeyPressed = keyProps.onKeyPressed;
    render(<Key {...keyProps} />);

    expect(onKeyPressed).toHaveBeenCalledTimes(0);
    fireEvent.click(screen.getByRole('button'));
    
    expect(onKeyPressed).toHaveBeenCalledTimes(1);
    expect(onKeyPressed).toHaveBeenCalledWith(keyProps.keyText);
  });
})
