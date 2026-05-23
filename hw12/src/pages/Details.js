import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';

function Details() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`) // Replace with your API
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="details-container">
      <h1>{item.title}</h1>
      <p>ID: {item.id}</p>
      <p>{item.body}</p>
      <img src={`https://via.placeholder.com/600/92c952`} alt={item.title} />
      <button onClick={() => addFavorite(item)}>Add to Favorites</button>
    </div>
  );
}

export default Details;