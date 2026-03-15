import React, { useEffect, useState } from 'react';
import { getRestaurants } from '../services/restaurantService';
import styles from './RestaurantsPage.module.css';

function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getRestaurants()
      .then(setRestaurants)
      .catch(() => setError('Failed to load restaurants.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className={styles.message}>Loading…</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1>Restaurants</h1>
      {restaurants.length === 0 ? (
        <p>No restaurants available yet.</p>
      ) : (
        <ul className={styles.grid}>
          {restaurants.map((r) => (
            <li key={r.id} className={styles.card}>
              <h2>{r.name}</h2>
              <p>{r.address}</p>
              {r.phone && <p>📞 {r.phone}</p>}
              {r.description && <p>{r.description}</p>}
              <p>Capacity: {r.capacity}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RestaurantsPage;
