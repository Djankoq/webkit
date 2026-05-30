import React, { useContext, memo, useCallback } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

function Favorites() {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  const handleRemove = useCallback((id) => {
    removeFavorite(id);
  }, [removeFavorite]);

  if (favorites.length === 0) {
    return <div>Your favorites list is empty.</div>;
  }

  return (
    <div>
      <h1>Favorites</h1>
      <div className="card-container">
        {favorites.map((item) => (
          <div key={item.id} className="card">
            <h2>{item.title}</h2>
            <p>Quantity: {item.quantity}</p>
            <p>ID: {item.id}</p>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Favorites);