import { render, screen } from '@testing-library/react';
import Page from './page';

it('Renders the page', () => {
  render(<Page />);

  expect(screen.getByText('Mathler')).toBeInTheDocument();
  expect(screen.getByRole('main')).not.toBeEmptyDOMElement();
});
