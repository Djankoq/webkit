import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavoritesContext } from '../context/FavoritesContext';
import Favorites from './Favorites';

const mockFavorites = [
  { id: 1, title: 'Test Item 1', quantity: 2 },
  { id: 2, title: 'Test Item 2', quantity: 1 },
];

const removeFavorite = jest.fn();

const renderWithProvider = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <FavoritesContext.Provider {...providerProps}>{ui}</FavoritesContext.Provider>,
    renderOptions
  );
};

test('renders favorites list', () => {
  renderWithProvider(<Favorites />, {
    providerProps: { value: { favorites: mockFavorites, removeFavorite } },
  });

  expect(screen.getByText('Test Item 1')).toBeInTheDocument();
  expect(screen.getByText('Test Item 2')).toBeInTheDocument();
  expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
});

test('calls removeFavorite on button click', () => {
  renderWithProvider(<Favorites />, {
    providerProps: { value: { favorites: mockFavorites, removeFavorite } },
  });

  const removeButtons = screen.getAllByText('Remove');
  fireEvent.click(removeButtons[0]);

  expect(removeFavorite).toHaveBeenCalledWith(1);
});

test('shows empty message when no favorites', () => {
  renderWithProvider(<Favorites />, {
    providerProps: { value: { favorites: [], removeFavorite } },
  });

  expect(screen.getByText('Your favorites list is empty.')).toBeInTheDocument();
});