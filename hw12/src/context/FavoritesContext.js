import React, { createContext, useState, useEffect, useCallback } from 'react';

export const FavoritesContext = createContext();

const getInitialState = () => {
  const savedFavorites = localStorage.getItem('favorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = useCallback((item) => {
    setFavorites((prevFavorites) => {
      const existing = prevFavorites.find(fav => fav.id === item.id);
      if (existing) {
        return prevFavorites.map(fav =>
          fav.id === item.id ? { ...fav, quantity: fav.quantity + 1 } : fav
        );
      }
      return [...prevFavorites, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFavorite = useCallback((itemId) => {
    setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.id !== itemId));
  }, []);

  const value = { favorites, addFavorite, removeFavorite };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};