import React from 'react';
import { screen} from '@testing-library/react';
import { render } from './test-utils';
import App from './App';

describe('App', () => {
  test('renders app component', () => {

    render(<App />);
    const linkElement = screen.getByText(/star wars/i);
    expect(linkElement).toBeInTheDocument();

    const missingElement = screen.queryByText(/not in doc/i);
    expect(missingElement).not.toBeInTheDocument();
  });
});
