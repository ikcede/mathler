import { render, screen } from "@testing-library/react";
import Tile, { TileProps } from './Tile';
import styling from './Key.module.css';
import { DisplayState } from "../util/constants";

let tileProps: TileProps;

describe('Tile', () => {
  beforeEach(() => {
    tileProps = {
      text: '0',
    };
  });

  it('renders a tile with default styling', () => {
    render(<Tile {...tileProps} />);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('0'))
        .toHaveClass(styling[DisplayState.DEFAULT]);
  });

  it('renders with status', () => {
    tileProps.status = DisplayState.ABSENT;
    render(<Tile {...tileProps} />);
    expect(screen.getByText('0'))
        .toHaveClass(styling[DisplayState.ABSENT]);
  });
})
