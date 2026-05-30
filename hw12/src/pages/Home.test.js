import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders welcome message', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Welcome to our store!/i);
  expect(linkElement).toBeInTheDocument();
});