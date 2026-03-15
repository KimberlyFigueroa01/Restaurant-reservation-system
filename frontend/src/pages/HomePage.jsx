import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.hero}>
      <h1>Welcome to ReservaFácil</h1>
      <p>Find and book tables at the best restaurants in town.</p>
      <div className={styles.actions}>
        <Link to="/restaurants" className={styles.btnPrimary}>
          Browse Restaurants
        </Link>
        <Link to="/reservations/new" className={styles.btnSecondary}>
          Book a Table
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
