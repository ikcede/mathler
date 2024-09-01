import { render, screen } from "@testing-library/react";
import Row, { RowProps } from './Row';
import styling from './Key.module.css';
import { DisplayState } from "../util/constants";

let rowProps: RowProps;

describe('Row', () => {
  beforeEach(() => {
    rowProps = {
      tiles: 2,
      value: '11',
    };
  });

  it('renders a row with default styling', () => {
    render(<Row {...rowProps} />);

    let rows = screen.getAllByText('1');
    expect(rows).toHaveLength(rowProps.tiles);
    expect(rows[0]).toHaveClass(styling[DisplayState.DEFAULT]);
    expect(rows[1]).toHaveClass(styling[DisplayState.DEFAULT]);
  });

  it('renders with statuses', () => {
    rowProps.displayStates = [DisplayState.ABSENT, DisplayState.CORRECT];
    render(<Row {...rowProps} />);

    let rows = screen.getAllByText('1');
    expect(rows).toHaveLength(rowProps.tiles);
    expect(rows[0]).toHaveClass(styling[DisplayState.ABSENT]);
    expect(rows[1]).toHaveClass(styling[DisplayState.CORRECT]);
  });
})
