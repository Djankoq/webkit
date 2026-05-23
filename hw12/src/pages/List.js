import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function List() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts') // Replace with your API
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>List of Items</h1>
      <div className="card-container">
        {items.map((item) => (
          <div key={item.id} className="card">
            <h2>{item.title}</h2>
            <p>{item.body.substring(0, 50)}...</p>
            <p>ID: {item.id}</p>
            <Link to={`/list/${item.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;