import React from 'react';
import { screen } from '@testing-library/react';
import { render } from './test-utils';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
  const linkElement = screen.getByText(/star wars/i);
  expect(linkElement).toBeInTheDocument();

  const missingElement = screen.queryByText(/not in doc/i);
  expect(missingElement).not.toBeInTheDocument();
});