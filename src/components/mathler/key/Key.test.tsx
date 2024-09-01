import { fireEvent, render, screen } from "@testing-library/react";
import Key, { KeyProps } from './Key';
import styling from './Key.module.css';
import { DisplayState } from "../util/constants";

let keyProps: KeyProps;

describe('Key', () => {
  beforeEach(() => {
    keyProps = {
      keyText: '0',
      onKeyPressed: jest.fn(),
    };
  });

  it('renders a key with default styling', () => {
    render(<Key {...keyProps} />);
    expect(screen.getByRole('button')).toHaveTextContent(keyProps.keyText);
    expect(screen.getByRole('button'))
        .toHaveClass(styling[DisplayState.DEFAULT]);
  });

  it('renders a display state class', () => {
    keyProps.display = DisplayState.ABSENT;
    render(<Key {...keyProps} />);
    expect(screen.getByRole('button'))
        .toHaveClass(styling[DisplayState.ABSENT]);
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
