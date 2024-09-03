import { render, screen } from "@testing-library/react";
import Row, { RowProps } from './Row';
import styling from './Key.module.css';
import { DisplayState } from "../util/constants";

let rowProps: RowProps;

describe('Row', () => {
  beforeEach(() => {
    rowProps = {
      value: '11',
      displayStates: [DisplayState.DEFAULT, DisplayState.DEFAULT]
    };
  });

  it('renders a row with default styling', () => {
    render(<Row {...rowProps} />);

    let rows = screen.getAllByText('1');
    expect(rows).toHaveLength(2);
    expect(rows[0].parentElement)
        .toHaveClass(styling[DisplayState.DEFAULT]);
    expect(rows[1].parentElement)
        .toHaveClass(styling[DisplayState.DEFAULT]);
  });

  it('renders with different statuses', () => {
    rowProps.displayStates = [DisplayState.ABSENT, DisplayState.CORRECT];
    render(<Row {...rowProps} />);

    let rows = screen.getAllByText('1');
    expect(rows).toHaveLength(2);
    expect(rows[0].parentElement)
        .toHaveClass(styling[DisplayState.ABSENT]);
    expect(rows[1].parentElement)
        .toHaveClass(styling[DisplayState.CORRECT]);
  });
})
